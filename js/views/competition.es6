define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'components/text-cell'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, TextCellView) => {
    class ParticipantView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            const DOM = React.DOM;
            const participant = this.state.participant;

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
                DOM.td({className: 'important middle-aligned'}, "0/1"),
                DOM.td({className: 'middle-aligned'}, participant.team)
            ]);
        }

    }

    class AdditionalParticipantView extends Shuttle.React.Component {

        render() {
            const DOM = React.DOM;

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
                            DOM.tr({}, [
                                DOM.td({}, "1"),
                                DOM.td({className: 'col-md-2'}, "1:11.15"),
                                DOM.td({}, [
                                    React.createElement(ReactBootstrap.Label, {bsStyle: 'warning'}, "Cone")
                                ]),
                                DOM.td({className: 'col-md-2'}, "1:12.15"),
                                DOM.td({className: 'col-md-2'}, "0:00.00")
                            ]),
                            DOM.tr({}, [
                                DOM.td({}, "2"),
                                DOM.td({className: 'col-md-2'}, "1:11.16"),
                                DOM.td({}, [
                                    React.createElement(ReactBootstrap.Label, {bsStyle: 'warning'}, "Cone")
                                ]),
                                DOM.td({className: 'col-md-2'}, "1:12.16"),
                                DOM.td({className: 'col-md-2'}, "0:00.01")
                            ])
                        ])
                    ]))
                ]),
                DOM.td({style: {padding: '0'}, colSpan: 3})
            ]);
        }

    }

    class CompetitionView extends Shuttle.React.Component {

        constructor(props) {
            super(props);

            this.state.current = null;
        }

        render() {
            const DOM = React.DOM;
            const eventId = this.props.eventId;

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
                        R.flatten(R.mapIndexed((participant, i) => {
                            const opened = R.eq(this.state.current, participant.get());

                            return [
                                React.createElement(ParticipantView, {
                                    key: `main-${i}`,
                                    opened: opened,
                                    onToggle: () => {
                                        this.setState({current: !opened ? participant.get() : null});
                                    },
                                    participant: participant
                                }),
                                React.createElement(AdditionalParticipantView, {
                                    key: `additional-${i}`,
                                    opened: opened,
                                    participant: participant
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
