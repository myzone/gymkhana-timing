define(['react', 'react-router', 'react-bootstrap', 'ramda', 'moment', 'shuttle', 'shuttle-react', 'components/stopwatch-cell'], (React, ReactRouter, ReactBootstrap, R, moment, Shuttle, ShuttleReact, StopwatchCellView) => {
    const HEATS_COUNT = 2;
    const PENALTY_STYLES = {
        negligible: 'default',
        significant: 'warning',
        critical: 'danger'
    };

    class ParticipantView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            const DOM = React.DOM;
            const participant = this.state.participant;
            const heats = this.props.heats;

            return DOM.tr({
                key: 'opened-participant-row-1',
                className: `non-selected ${this.props.opened ? 'selected' : ''}`,
                onClick: () => this.props.onToggle()
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

        render() {
            const DOM = React.DOM;
            const participant = this.state.participant;
            const semiResults = R.map(heat => {
                return {
                    time: heat.time,
                    penalties: heat.penalties,
                    totalTime: R.reduce((time, delay) => time.add(delay), moment.duration(heat.time), R.map(penalty => penalty.delay, heat.penalties))
                }
            }, R.map(heat => heat.result({
                onTimedResult: (time, penalties) => {
                    return {
                        time: time,
                        penalties: penalties
                    };
                },
                onHaventStared: () => {
                    return {
                        time: moment.duration({
                            minutes: 59,
                            seconds: 59,
                            milliseconds: 999
                        }),
                        penalties: [{
                            name: 'HS',
                            type: 'negligible',
                            delay: moment.duration(0)
                        }]
                    };
                }
            }), R.concat(this.props.heats, R.repeat({
                participant: participant,
                result: callback => callback.onHaventStared()
            }, HEATS_COUNT - this.props.heats.length))));
            const bestHeatTime = R.min(R.map(result => result.totalTime), semiResults);
            const results = R.map(result => {
                return {
                    time: result.time,
                    penalties: result.penalties,
                    totalTime: result.totalTime,
                    deltaTime: moment.duration(result.totalTime).subtract(bestHeatTime)
                }
            }, semiResults);

            return DOM.tr({key: 'opened-participant-row-2'}, [
                DOM.td({style: {padding: '0'}}),
                DOM.td({style: {padding: '0'}, colSpan: 3}, [
                    DOM.div({className: `non-selected-additional ${this.props.opened ? 'selected-additional' : ''}`}, React.createElement(ReactBootstrap.Table, {
                        className: 'inner-table',
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
                        DOM.tbody({}, [
                            R.addIndex(R.map)((result, i) => DOM.tr({key: i}, [
                                DOM.td({}, i + 1),
                                DOM.td({className: 'col-md-2'}, React.createElement(StopwatchCellView, {})/*this.renderDuration(result.time)*/),
                                DOM.td({}, R.map(penalty => [React.createElement(ReactBootstrap.Label, {bsStyle: PENALTY_STYLES[penalty.type]}, penalty.name), ' '], result.penalties)),
                                DOM.td({className: 'col-md-2'}, this.renderDuration(result.totalTime)),
                                DOM.td({className: 'col-md-2'}, `+${this.renderDuration(result.deltaTime)}`)
                            ]), results)
                        ])
                    ]))
                ]),
                DOM.td({style: {padding: '0'}, colSpan: 3})
            ]);
        }

        renderDuration(duration) {
            return `${duration.minutes()}:${duration.seconds()}.${this.pad(duration.milliseconds(), 3).substr(0, 2)}`
        }

        pad(n, size) {
            const s = R.repeat('0', size - 1).join('') + n;

            return s.substr(s.length - size);
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
                    className: 'pair-table-striped',
                    responsive: true,
                    hover: true
                }, [
                    DOM.tbody({key: 'table-body'}, [
                        R.flatten(R.addIndex(R.map)((participant, i) => {
                            const opened = R.equals(this.state.current, participant.get());
                            const heats = R.filter(heat => R.equals(heat.participant, participant.get()), this.state.heats);

                            return [
                                React.createElement(ParticipantView, {
                                    key: `main-${i}`,
                                    opened: opened,
                                    onToggle: () => {
                                        this.setState({current: !opened ? participant.get() : null});
                                    },
                                    participant: participant,
                                    heats: heats,
                                    eventId: eventId
                                }),
                                React.createElement(AdditionalParticipantView, {
                                    key: `additional-${i}`,
                                    opened: opened,
                                    participant: participant,
                                    heats: heats
                                })
                            ]
                        }, this.state.participants))
                    ])
                ])
            ]);
        }

    }

    return CompetitionView;
});
