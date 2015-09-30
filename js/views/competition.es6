define(['react', 'react-router', 'react-bootstrap', 'ramda', 'moment', 'moment-durations', 'shuttle', 'shuttle-react', 'components/stopwatch-cell', 'components/country-flag', 'utils/commons'], (React, ReactRouter, ReactBootstrap, R, moment, momentDurations, Shuttle, ShuttleReact, StopwatchCellView, CountryFlagView, Commons) => {
    const HEATS_COUNT = 2;
    const PENALTY_STYLES = {
        negligible: 'default',
        significant: 'warning',
        critical: 'danger'
    };

    const renderDuration = duration => duration.format("mm:ss.SSS", {trim: false});

    class HeatView extends React.Component {

        constructor(props) {
            super(props);

            this.time = Shuttle.ref(this.props.result.time);
            this.penalties = Shuttle.ref(this.props.result.penalties);

            this.heat = Shuttle.combine([this.time, this.penalties], (time, penalties) => {
                return {
                    id: !R.isNil(this.props.result.id) ? this.props.result.id : Commons.guid(),
                    participant: this.props.result.participant,
                    number: this.props.result.number,
                    result: !R.isNil(time) || !R.isEmpty(penalties)
                        ? {type: 'TimedResult', time: time, penalties: penalties}
                        : {type: 'NoTimeResult'}
                }
            }).log();

            this.listener = (_, heat) => {
                let heats = this.props.heats.get();

                const index = R.findIndex(heat => heat.id == this.props.result.id, heats);
                if (index >= 0) {
                    heats = R.remove(index, 1, heats);
                }

                this.props.heats.set(R.append(heat, heats));
            }
        }

        componentDidMount() {
            this.heat.addListener(this.listener);
        }

        componentWillUnmount() {
            this.heat.removeListener(this.listener);
        }

        render() {
            return React.DOM.tbody({}, [
                React.createElement(AdditionalHeatView1, {
                    rowId: this.props.rowId,
                    currentRow: this.props.currentRow,

                    time: this.time,
                    penalties: this.penalties,
                    penaltyTypes: this.props.penaltyTypes,

                    result: this.props.result
                }),
                React.createElement(AdditionalHeatView2, {
                    rowId: this.props.rowId,
                    currentRow: this.props.currentRow,

                    time: this.time,
                    penalties: this.penalties,
                    penaltyTypes: this.props.penaltyTypes,

                    result: this.props.result,

                    heat: this.heat,
                    heats: this.props.heats
                })
            ]);
        }

    }

    class PenaltyView extends Shuttle.React.Component {

        render() {
            const penalty = this.state.penalty;

            const selected = this.props.selected;
            const i = this.props.i;

            const onClick = () => {
                if (selected) {
                    this.props.penalties.set(R.remove(i, 1, this.state.penalties))
                }
            };

            return React.createElement(ReactBootstrap.Label, {
                key: i,
                bsStyle: PENALTY_STYLES[penalty.type],
                onClick: onClick
            }, selected
                ? [penalty.name, ' ', React.createElement(ReactBootstrap.Glyphicon, {
                className: 'tag-remove-btn',
                glyph: 'remove'
            })]
                : penalty.name);
        }

    }

    class AddPenaltyButton extends Shuttle.React.Component {

        render() {
            const penalty = this.state.penalty;

            return React.createElement(ReactBootstrap.OverlayTrigger, {
                placement: 'bottom',
                delayShow: 1000,
                overlay: React.createElement(ReactBootstrap.Tooltip, {}, penalty.description)
            }, React.createElement(ReactBootstrap.Button, {
                bsSize: 'small',
                bsStyle: PENALTY_STYLES[penalty.type],
                onClick: () => {
                    this.props.penalties.set(R.append(penalty.id, this.state.penalties))
                }
            }, penalty.name));
        }

    }


    class AdditionalHeatView1 extends Shuttle.React.Component {

        render() {
            const DOM = React.DOM;
            const selected = this.state.currentRow == this.props.rowId;
            const onSelect = () => {
                if (R.isNil(this.state.currentRow)) {
                    this.props.currentRow.set(this.props.rowId);
                }
            };

            return DOM.tr({
                className: selected ? 'info selected-heat-row' : '',
                onClick: onSelect
            }, [
                DOM.td({}, this.props.rowId + 1),
                DOM.td({className: 'col-md-2'}, selected
                    ? React.createElement(StopwatchCellView, {value: this.props.time})
                    : this.props.result.time ? renderDuration(this.props.result.time) : ''),
                DOM.td({}, R.addIndex(R.map)((penalty, i) => [React.createElement(PenaltyView, {
                    i: i,
                    penalty: this.state.penaltyTypes[penalty],
                    penalties: this.props.penalties,
                    selected: selected
                }), ' '], this.state.penalties)),
                DOM.td({className: 'col-md-2'}, renderDuration(this.props.result.totalTime)),
                DOM.td({className: 'col-md-2'}, `+${renderDuration(this.props.result.deltaTime)}`)
            ]);
        }

    }

    class AdditionalHeatView2 extends Shuttle.React.Component {

        render() {
            return this.state.currentRow == this.props.rowId
                ? this.renderSelected()
                : this.renderNonSelected();
        }

        renderSelected() {
            const DOM = React.DOM;

            return DOM.tr({className: 'info selected-heat-row-additional'}, [
                DOM.td({}, ''),
                DOM.td({className: 'col-md-2'}, ''),
                DOM.td({colSpan: 2}, React.createElement(ReactBootstrap.ButtonGroup, {}, R.addIndex(R.map)((penalty, i) => {
                    return React.createElement(AddPenaltyButton, {
                        penalty: penalty,
                        penalties: this.props.penalties
                    });
                }, R.values(this.state.penaltyTypes)))),
                DOM.td({}, React.createElement(ReactBootstrap.Button, {
                    bsSize: 'small',
                    onClick: () => {
                        this.props.currentRow.set(null);
                    }
                }, React.createElement(ReactBootstrap.Glyphicon, {
                    glyph: 'ok'
                })))
            ])
        }

        renderNonSelected() {
            return React.DOM.tr({key: 'empty'});
        }

    }


    class ParticipantView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            const DOM = React.DOM;
            const participant = this.state.participant;
            const heats = this.state.heats;

            return DOM.tr({
                key: 'opened-participant-row-1',
                className: `non-selected ${this.props.opened ? 'selected' : ''}`,
                onClick: () => this.props.onToggle()
            }, [
                DOM.td({className: 'important middle-aligned'}, DOM.span({className: 'race-number'}, participant.number)),
                DOM.td({className: 'important middle-aligned'}, participant.country ? React.createElement(CountryFlagView, {country: participant.country}) : ''),
                DOM.td({className: 'important middle-aligned'}, participant.name),
                DOM.td({className: 'middle-aligned'}, participant.motorcycle),
                DOM.td({className: 'middle-aligned'}, participant.group),
                DOM.td({className: 'important middle-aligned'}, `${heats.length}/${HEATS_COUNT}`),
                DOM.td({className: 'middle-aligned'}, participant.team)
            ]);
        }

    }

    class AdditionalParticipantView extends Shuttle.React.Component {

        constructor(props) {
            super(props);

            this.currentRow = Shuttle.ref(this.props.currentRow);

            this.detectNext = R.compose(
                data => data.participant,
                R.head,
                R.sortBy(item => item.count),
                R.map(participant => R.identity({
                    participant: participant,
                    count: R.length(R.filter(heat => R.equals(heat.participant, participant.id), this.state.heats))
                })),
                R.map(ref => ref.get())
            );
        }

        render() {
            const DOM = React.DOM;
            const participant = this.state.participant;
            const currentRow = this.currentRow;
            const results = this.state.results;

            return DOM.tr({key: 'opened-participant-row-2'}, [
                DOM.td({style: {padding: '0'}}, React.createElement('center', {className: 'goto-next'}, this.props.opened ? React.createElement(ReactBootstrap.Glyphicon, {
                    onClick: () => this.props.onNext(this.detectNext(this.state.participants)),
                    glyph: 'forward'
                }) : '')),
                DOM.td({style: {padding: '0'}, colSpan: 3}, [
                    DOM.div({className: `non-selected-additional ${this.props.opened ? 'selected-additional' : ''}`}, React.createElement(ReactBootstrap.Table, {
                        className: 'inner-table group-table-striped group-table-hover',
                        responsive: true,
                        condensed: true
                    }, [
                        DOM.thead({}, DOM.tr({}, [
                            DOM.td({}, ""),
                            DOM.td({}, "Time"),
                            DOM.td({}, "Penalty"),
                            DOM.th({}, "Total"),
                            DOM.td({}, "∆")
                        ])),
                        R.addIndex(R.map)((result, i) => {
                            return React.createElement(HeatView, {
                                key: i,

                                rowId: i,
                                currentRow: currentRow,
                                penaltyTypes: this.props.penaltyTypes,

                                result: result,
                                heats: this.props.heats
                            })
                        }, results)
                    ]))
                ]),
                DOM.td({style: {padding: '0'}, colSpan: 3})
            ]);
        }

    }

    class CompetitionView extends Shuttle.React.Component {

        constructor(props) {
            super(props);

            this.state.current = R.head(R.filter(participant => R.equals(participant.id, this.props.params.participantId), R.map(participant => participant.get(), this.state.participants)));
        }

        render() {
            const DOM = React.DOM;
            const eventId = this.props.params.eventId;

            return DOM.div({}, [
                React.createElement(ReactBootstrap.Pager, {}, [
                    React.createElement(ReactBootstrap.PageItem, {
                        previous: true,
                        href: `#event/${eventId}/registration`
                    }, [
                        React.createElement(ReactBootstrap.Glyphicon, {glyph: 'menu-left'}), ' ', "Registration"
                    ]),
                    React.createElement(ReactBootstrap.PageItem, {href: `#event/${eventId}/competition`}, "Competition"),
                    React.createElement(ReactBootstrap.PageItem, {next: true, href: `#event/${eventId}/results`}, [
                        "Results", ' ', React.createElement(ReactBootstrap.Glyphicon, {glyph: 'menu-right'})
                    ])
                ]),

                React.createElement(ReactBootstrap.Table, {
                    key: 'table',
                    className: 'group-table-striped group-table-hover data-editable',
                    responsive: true,
                    hover: true
                }, [

                    R.addIndex(R.map)((participant, i) => {
                            const opened = R.equals(this.state.current, participant.get());
                            const heats = this.props.heats
                                .map(heats => R.filter(heat => R.equals(heat.participant, participant.get().id), heats));

                            const results = heats
                                .map(heats => R.map(heat => {
                                        if (heat.result.type == 'TimedResult')
                                            return {
                                                id: heat.id,
                                                participant: heat.participant,
                                                number: heat.number,
                                                time: heat.result.time,
                                                penalties: heat.result.penalties,
                                                totalTime: R.reduce((time, delay) => time.add(delay), moment.duration(heat.result.time), R.map(penalty => this.state.penaltyTypes[penalty].get().delay, heat.result.penalties))
                                            };

                                        if (heat.result.type == 'NoTimeResult')
                                            return {
                                                id: heat.id,
                                                participant: heat.participant,
                                                number: heat.number,
                                                time: null,
                                                penalties: [],
                                                totalTime: moment.duration({
                                                    minutes: 59,
                                                    seconds: 59,
                                                    milliseconds: 999
                                                })
                                            };

                                        throw 'undefined';
                                    }, R.reduce((result, i) => R.append(R.find(heat => heat.number == i + 1, heats) || {
                                            participant: participant.get().id,
                                            number: i + 1,
                                            result: {
                                                type: 'NoTimeResult'
                                            }
                                        }, result), [], R.range(0, HEATS_COUNT)))
                                )
                                .map(semiResults => {
                                    const bestHeatTime = R.reduce(R.min, moment.duration(Infinity), R.map(result => result.totalTime, semiResults));

                                    return R.sortBy(result => result.number, R.map(result => {
                                        return {
                                            id: result.id,
                                            time: result.time,
                                            participant: result.participant,
                                            number: result.number,
                                            penalties: result.penalties,
                                            totalTime: result.totalTime,
                                            deltaTime: moment.duration(result.totalTime).subtract(bestHeatTime)
                                        }
                                    }, semiResults));
                                });

                            return DOM.tbody({key: i}, [
                                React.createElement(ParticipantView, {
                                    key: `main-${i}`,
                                    opened: opened,
                                    onToggle: () => {
                                        this.setState({current: !opened ? participant.get() : null});
                                    },
                                    participant: participant,
                                    heats: heats
                                        .map(heats => R.filter(heat => heat.result.type == 'TimedResult', heats)),
                                    eventId: eventId
                                }),
                                React.createElement(AdditionalParticipantView, {
                                    key: `additional-${i}`,
                                    opened: opened,
                                    participant: participant,
                                    heats: this.props.heats,
                                    results: results,
                                    penaltyTypes: this.props.penaltyTypes,
                                    participants: this.props.participants,
                                    onNext: (next) => {
                                        this.setState({current: next});
                                    }
                                })
                            ])
                        },
                        this.state.participants
                    )
                ])
            ]);
        }

    }

    return CompetitionView;
});
