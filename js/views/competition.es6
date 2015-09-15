define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'components/text-cell',], (React, ReactBootstrap, R, Shuttle, ShuttleReact, TextCellView) => {
    class ParticipantView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            return this.state.opened
                ? this.renderOpened()
                : this.renderClosed();
        }

        renderClosed() {
            const DOM = React.DOM;

            return DOM.tr({key: 'closed-participant-row', onClick: () => this.props.opened.set(true)}, [
                DOM.td({}, DOM.span({className: 'race-number'}, "42")),
                DOM.td({}, DOM.img({height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif'})),
                DOM.td({}, "Vyacheslav Goldenshteyn"),
                DOM.td({}, "Honda FMX 650"),
                DOM.td({}, "Group 3B"),
                DOM.td({}, "1/2"),
                DOM.td({}, "Sommmmm Team")
            ])
        }

        renderOpened() {
            const DOM = React.DOM;

            return DOM.tr({key: 'opened-participant-row-1', onClick: () => this.props.opened.set(false)}, [
                DOM.td({
                    style: {
                        fontSize: '34px',
                        verticalAlign: 'middle'
                    }
                }, DOM.span({className: 'race-number'}, "42")),
                DOM.td({style: {verticalAlign: 'middle'}}, DOM.img({
                    height: '48px',
                    src: 'http://www.geonames.org/flags/x/ua.gif'
                })),
                DOM.td({style: {fontSize: '34px', verticalAlign: 'middle'}}, "Vyacheslav Goldenshteyn"),
                DOM.td({style: {verticalAlign: 'middle'}}, "Honda FMX 650"),
                DOM.td({style: {verticalAlign: 'middle'}}, "Group 3B"),
                DOM.td({style: {fontSize: '34px', verticalAlign: 'middle'}}, "0/1"),
                DOM.td({style: {verticalAlign: 'middle'}}, "Sommmmm Team")
            ]);
        }

    }

    class AdditionalParticipantView extends Shuttle.React.Component {

        render() {
            return this.state.opened
                ? this.renderOpened()
                : this.renderClosed();
        }

        renderClosed() {
            const DOM = React.DOM;

            return DOM.tr({onClick: () => this.props.opened.set(true)})
        }

        renderOpened() {
            const DOM = React.DOM;

            return DOM.tr({key: 'opened-participant-row-2', onClick: () => this.props.opened.set(false)}, [
                DOM.td({}),
                DOM.td({colSpan: '3'}, [
                    React.createElement(ReactBootstrap.Table, {className: 'inner-table', responsive: true, condensed: true}, [
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
                    ])
                ]),
                DOM.td({}),
                DOM.td({}),
                DOM.td({})
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
