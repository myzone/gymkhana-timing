define(['react', 'react-bootstrap'], (React, ReactBootstrap) => {
    class CompetitionView extends React.Component {
        render() {
            const DOM = React.DOM;

            return DOM.div({}, [
                React.createElement(ReactBootstrap.Table, {responsive: true, hover: true, striped: true}, [
                    DOM.tbody({}, [
                        DOM.tr({}, [
                            DOM.td({}, DOM.span({className: 'race-number'}, "42")),
                            DOM.td({}, DOM.img({height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif'})),
                            DOM.td({}, "Vyacheslav Goldenshteyn"),
                            DOM.td({}, "Honda FMX 650"),
                            DOM.td({}, "Group 3B"),
                            DOM.td({}, "1/2"),
                            DOM.td({}, "Sommmmm Team")
                        ]),
                        DOM.tr({}, [
                            DOM.td({}, DOM.span({className: 'race-number'}, "42")),
                            DOM.td({}, DOM.img({height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif'})),
                            DOM.td({}, "Vyacheslav Goldenshteyn"),
                            DOM.td({}, "Honda FMX 650"),
                            DOM.td({}, "Group 3B"),
                            DOM.td({}, "0/1"),
                            DOM.td({}, "Sommmmm Team")
                        ]),
                        DOM.tr({className: 'selected-row'}, [
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
                        ]),
                        DOM.tr({className: 'selected-row-after'}, [
                            DOM.td({}),
                            DOM.td({colSpan: '3'}, [
                                React.createElement(ReactBootstrap.Table, {responsive: true, condensed: true}, [
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
                        ]),
                        DOM.tr({}, [
                            DOM.td({}, DOM.span({className: 'race-number'}, "42")),
                            DOM.td({}, DOM.img({height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif'})),
                            DOM.td({}, "Vyacheslav Goldenshteyn"),
                            DOM.td({}, "Honda FMX 650"),
                            DOM.td({}, "Group 3B"),
                            DOM.td({}, "0/1"),
                            DOM.td({}, "Sommmmm Team")
                        ])
                    ])
                ])
            ]);
        }
    }

    return CompetitionView;
});
