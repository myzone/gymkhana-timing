define(['react', 'react-router', 'react-bootstrap', 'ramda', 'moment', 'moment-durations', 'shuttle', 'shuttle-react', 'components/stopwatch-cell', 'utils/commons'], (React, ReactRouter, ReactBootstrap, R, moment, momentDurations, Shuttle, ShuttleReact, StopwatchCellView, Commons) => {
    const HEATS_COUNT = 2;
    const PENALTY_STYLES = {
        negligible: 'default',
        significant: 'warning',
        critical: 'danger'
    };
    const PENALTIES = [{
        name: 'CM',
        description: 'Course miss',
        delay: moment.duration({seconds: 0}),
        type: 'negligible'
    }, {
        name: 'CT',
        description: 'Cone touch',
        delay: moment.duration({seconds: 1}),
        type: 'significant'
    }, {
        name: 'GS',
        description: 'Ground stand',
        delay: moment.duration({seconds: 1}),
        type: 'significant'
    }, {
        name: 'WF',
        description: 'Wrong finish',
        delay: moment.duration({seconds: 3}),
        type: 'significant'
    }, {
        name: 'WC',
        description: 'Wrong course',
        delay: moment.duration({seconds: 0}),
        type: 'critical'
    }];

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
            });

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
                    result: this.props.result
                }),
                React.createElement(AdditionalHeatView2, {
                    rowId: this.props.rowId,
                    currentRow: this.props.currentRow,

                    time: this.time,
                    penalties: this.penalties,

                    result: this.props.result,

                    heat: this.heat,
                    heats: this.props.heats
                })
            ]);
        }

    }

    class AdditionalHeatView1 extends Shuttle.React.Component {

        render() {
            return this.state.currentRow == this.props.rowId
                ? this.renderSelected()
                : this.renderNonSelected();
        }

        renderSelected() {
            const DOM = React.DOM;

            return DOM.tr({key: 'selected', className: 'info selected-heat-row'}, [
                DOM.td({}, this.props.rowId + 1),
                DOM.td({className: 'col-md-2'}, React.createElement(StopwatchCellView, {value: this.props.time})),
                DOM.td({}, R.addIndex(R.map)((penalty, i) => [React.createElement(ReactBootstrap.Label, {
                    key: i,
                    bsStyle: PENALTY_STYLES[penalty.type],
                    onClick: () => {
                        this.props.penalties.set(R.remove(i, 1, this.props.result.penalties))
                    }
                }, [
                    penalty.name,
                    ' ',
                    React.createElement(ReactBootstrap.Glyphicon, {
                        className: 'tag-remove-btn',
                        glyph: 'remove'
                    })
                ]), ' '], this.props.result.penalties)),
                DOM.td({className: 'col-md-2'}, renderDuration(this.props.result.totalTime)),
                DOM.td({className: 'col-md-2'}, `+${renderDuration(this.props.result.deltaTime)}`)
            ]);
        }

        renderNonSelected() {
            const DOM = React.DOM;

            return DOM.tr({
                key: 'non-selected',
                onClick: () => {
                    if (R.isNil(this.state.currentRow)) {
                        this.props.currentRow.set(this.props.rowId);
                    }
                }
            }, [
                DOM.td({}, this.props.rowId + 1),
                DOM.td({className: 'col-md-2'}, this.props.result.time ? renderDuration(this.props.result.time) : ''),
                DOM.td({}, R.addIndex(R.map)((penalty, i) => [React.createElement(ReactBootstrap.Label, {
                    key: i,
                    bsStyle: PENALTY_STYLES[penalty.type]
                }, penalty.name), ' '], this.props.result.penalties)),
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
                    return React.createElement(ReactBootstrap.OverlayTrigger, {
                        key: `overlay-trigger-${i}`,
                        placement: 'bottom',
                        delayShow: 1000,
                        overlay: React.createElement(ReactBootstrap.Tooltip, {key: `overlay-${i}`}, penalty.description)
                    }, React.createElement(ReactBootstrap.Button, {
                        key: `button-${i}`,
                        bsSize: 'small',
                        bsStyle: PENALTY_STYLES[penalty.type],
                        onClick: () => {
                            this.props.penalties.set(R.append(penalty, this.props.result.penalties))
                        }
                    }, penalty.name));
                }, PENALTIES))),
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
                className: `non-selected ${this.state.opened ? 'selected' : ''}`,
                onClick: () => {
                    if (R.isNil(this.state.currentRow)) {
                        this.props.current.set(!this.state.opened ? participant : null)
                    }
                }
            }, [
                DOM.td({className: 'important middle-aligned'}, DOM.span({className: 'race-number'}, participant.number)),
                DOM.td({className: 'middle-aligned'}, DOM.img({
                    className: 'country',
                    src: `http://www.geonames.org/flags/x/${participant.country}.gif`
                })),
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
        }

        render() {
            const DOM = React.DOM;
            const participant = this.state.participant;
            const currentRow = this.props.currentRow;
            const results = this.state.results;

            return DOM.tr({key: 'opened-participant-row-2'}, [
                DOM.td({style: {padding: '0'}}, React.createElement('center', {className: 'goto-next'}, this.state.opened ? React.createElement(ReactBootstrap.Glyphicon, {
                    glyph: 'forward',
                    onClick: () => {
                        if (R.isNil(this.state.currentRow)) {
                            const heats = R.map(participant => {
                                return {
                                    participant: participant,
                                    count: R.length(R.filter(heat => R.equals(heat.participant.get(), participant), this.state.heats))
                                }
                            }, R.map(ref => ref.get(), this.state.participants));

                            const minHeatsCount = R.reduce(R.min, Infinity, R.map(heats => heats.count, heats));
                            const next = R.find(participant => participant.count == minHeatsCount, heats).participant;

                            this.props.current.set(null);
                            setTimeout(() => this.props.current.set(next), 800);
                        }
                    }
                }) : '')),
                DOM.td({style: {padding: '0'}, colSpan: 3}, [
                    DOM.div({className: `non-selected-additional ${this.state.opened ? 'selected-additional' : ''}`}, React.createElement(ReactBootstrap.Table, {
                        className: 'inner-table pair-table-striped',
                        responsive: true,
                        condensed: true,
                        hover: true
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

            this.current = Shuttle.ref(R.find(participant => R.equals(participant.id, this.props.params.participantId), R.map(ref => ref.get(), this.state.participants)));
            this.currentRow = Shuttle.ref(this.props.currentRow);
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
                    className: 'pair-table-striped data-editable',
                    responsive: true,
                    hover: true
                }, [
                    DOM.tbody({key: 'table-body'}, [
                        R.flatten(R.addIndex(R.map)((participant, i) => {
                                const opened = this.current
                                    .map(current => R.equals(current, participant.get()));
                                const heats = this.props.heats
                                    .map(heats => R.filter(heat => R.equals(heat.participant.get(), participant.get()), heats));

                                const results = heats
                                    .map(heats => R.map(heat => {
                                            if (heat.result.type == 'TimedResult')
                                                return {
                                                    id: heat.id,
                                                    participant: heat.participant,
                                                    number: heat.number,
                                                    time: heat.result.time,
                                                    penalties: heat.result.penalties,
                                                    totalTime: R.reduce((time, delay) => time.add(delay), moment.duration(heat.result.time), R.map(penalty => penalty.delay, heat.result.penalties))
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
                                                participant: participant,
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

                                return [
                                    React.createElement(ParticipantView, {
                                        key: `main-${i}`,
                                        opened: opened,
                                        current: this.current,
                                        currentRow: this.currentRow,
                                        participant: participant,
                                        heats: heats
                                            .map(heats => R.filter(heat => heat.result.type == 'TimedResult', heats)),
                                        eventId: eventId
                                    }),
                                    React.createElement(AdditionalParticipantView, {
                                        key: `additional-${i}`,
                                        opened: opened,
                                        current: this.current,
                                        currentRow: this.currentRow,
                                        participant: participant,
                                        heats: this.props.heats,
                                        results: results,
                                        participants: this.props.participants
                                    })
                                ]
                            },
                            this.state.participants
                        ))
                    ])
                ])
            ]);
        }

    }

    return CompetitionView;
});
