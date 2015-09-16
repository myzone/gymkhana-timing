define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'components/text-cell',], (React, ReactBootstrap, R, Shuttle, ShuttleReact, TextCellView) => {
    class ParticipantView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            const DOM = React.DOM;

            return DOM.tr({key: 'opened-participant-row-1', className: `non-selected ${this.state.opened ? 'selected' : ''}`,onClick: () => this.props.opened.set(!this.state.opened)}, [
                DOM.td({className: 'important middle-aligned'}, DOM.span({className: 'race-number'}, "42")),
                DOM.td({className: 'middle-aligned'}, DOM.img({className: 'country', src: 'http://www.geonames.org/flags/x/ua.gif'})),
                DOM.td({className: 'important middle-aligned'}, "Vyacheslav Goldenshteyn"),
                DOM.td({className: 'middle-aligned'}, "Honda FMX 650"),
                DOM.td({className: 'middle-aligned'}, "Group 3B"),
                DOM.td({className: 'important middle-aligned'}, "0/1"),
                DOM.td({className: 'middle-aligned'}, "Sommmmm Team")
            ]);
        }

    }

    class AdditionalParticipantView extends Shuttle.React.Component {

        render() {
            const DOM = React.DOM;

            return DOM.tr({key: 'opened-participant-row-2'}, [
                DOM.td({style: {padding: '0'}}),
                DOM.td({style: {padding: '0'}, colSpan: 3}, [
                    DOM.div({className: `non-selected-additional ${this.state.opened ? 'selected-additional' : ''}`}, React.createElement(ReactBootstrap.Table, {className: 'inner-table', responsive: true, condensed: true}, [
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

    const a = Shuttle.ref(false);
    const b = Shuttle.ref(true);
    const c = Shuttle.ref(false);
    const d = Shuttle.ref(false);

    class CompetitionView extends React.Component {
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
                    className: 'pair-table-striped',
                    responsive: true,
                    hover: true
                }, [
                    DOM.tbody({}, [
                        React.createElement(ParticipantView, {opened: a}),
                        React.createElement(AdditionalParticipantView, {opened: a}),
                        React.createElement(ParticipantView, {opened: b}),
                        React.createElement(AdditionalParticipantView, {opened: b}),
                        React.createElement(ParticipantView, {opened: c}),
                        React.createElement(AdditionalParticipantView, {opened: c}),
                        React.createElement(ParticipantView, {opened: d}),
                        React.createElement(AdditionalParticipantView, {opened: d})
                    ])
                ])
            ]);
        }
    }

    return CompetitionView;
});
