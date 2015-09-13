define(['react', 'react-bootstrap'], (React, ReactBootstrap) => {
    class ResultsView extends React.Component {
        render() {
            const DOM = React.DOM;

            const eventId = this.props.params.eventId;

            return DOM.div({}, [
                React.createElement(ReactBootstrap.Pager, {}, [
                    React.createElement(ReactBootstrap.PageItem, {previous: true, href: `#event/${eventId}/competition`}, [
                        React.createElement(ReactBootstrap.Glyphicon, {glyph: 'menu-left'}), ' ', "Competition"
                    ]),
                    React.createElement(ReactBootstrap.PageItem, {href: `#event/${eventId}/results`}, "Results")
                ]),

                DOM.table({style: {width: '100%'}}, DOM.tr({}, [
                    DOM.td({style: {width: '250px'}}),
                    DOM.td({}, [
                        React.createElement('center', {}, DOM.div({style: {marginTop: '20px'}}, [
                            DOM.span({className: 'race-number'}, "42"),
                            ' ',
                            DOM.span({}, "Vyacheslav Goldenshteyn")
                        ])),
                        DOM.div({
                            style: {
                                background: 'silver',
                                height: '60px',
                                marginLeft: '5px',
                                marginRight: '5px',
                                fontSize: '43px'
                            }
                        }, React.createElement('center', {}, DOM.span({
                            className: 'podium-label',
                            style: {
                                paddingLeft: '13px',
                                paddingRight: '13px'
                            }
                        }, "2")))
                    ]),
                    DOM.td({}, [
                        React.createElement('center', {}, DOM.div({style: {marginTop: '0px'}}, [
                            DOM.span({className: 'race-number'}, "42"),
                            ' ',
                            DOM.span({}, "Vyacheslav Goldenshteyn")
                        ])),
                        DOM.div({
                            style: {
                                background: 'gold',
                                height: '80px',
                                marginLeft: '5px',
                                marginRight: '5px',
                                fontSize: '58px'
                            }
                        }, React.createElement('center', {}, DOM.span({
                            className: 'podium-label',
                            style: {
                                paddingLeft: '16px',
                                paddingRight: '16px'
                            }
                        }, "1")))
                    ]),
                    DOM.td({}, [
                        React.createElement('center', {}, DOM.div({style: {marginTop: '40px'}}, [
                            DOM.span({className: 'race-number'}, "42"),
                            ' ',
                            DOM.span({}, "Vyacheslav Goldenshteyn")
                        ])),
                        DOM.div({
                            style: {
                                height: '40px',
                                background: '#CD7F32',
                                marginLeft: '5px',
                                marginRight: '5px',
                                fontSize: '30px'
                            }
                        }, React.createElement('center', {}, DOM.span({
                            className: 'podium-label',
                            style: {
                                paddingLeft: '9px',
                                paddingRight: '9px'
                            }
                        }, "3")))
                    ]),
                    DOM.td({style: {width: '250px'}})
                ])),


                React.createElement(ReactBootstrap.Table, {responsive: true, hover: true, striped: true}, [
                    DOM.thead({}, DOM.tr({}, [
                        DOM.td({}, ""),
                        DOM.td({}, "#"),
                        DOM.th({}, "Country"),
                        DOM.th({}, "Name"),
                        DOM.th({}, "Best time"),
                        DOM.th({}, "Motorcycle"),
                        DOM.th({}, "Group"),
                        DOM.th({}, "Age"),
                        DOM.th({}, "Team")
                    ])),
                    DOM.tbody({}, [
                        DOM.tr({}, [
                            DOM.td({}, "1"),
                            DOM.td({}, DOM.span({className: 'race-number'}, "42")),
                            DOM.td({}, DOM.img({height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif'})),
                            DOM.td({}, "Vyacheslav Goldenshteyn"),
                            DOM.td({}, "1:11.15"),
                            DOM.td({}, "Honda FMX 650"),
                            DOM.td({}, "Group 3B"),
                            DOM.td({}, "22"),
                            DOM.td({}, "Sommmmm Team")
                        ]),
                        DOM.tr({}, [
                            DOM.td({}, "2"),
                            DOM.td({}, DOM.span({className: 'race-number'}, "42")),
                            DOM.td({}, DOM.img({height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif'})),
                            DOM.td({}, "Vyacheslav Goldenshteyn"),
                            DOM.td({}, "1:11.15"),
                            DOM.td({}, "Honda FMX 650"),
                            DOM.td({}, "Group 3B"),
                            DOM.td({}, "22"),
                            DOM.td({}, "Sommmmm Team")
                        ]),
                        DOM.tr({className: 'selected-row'}, [
                            DOM.td({style: {fontSize: '18px', verticalAlign: 'middle'}}, "3"),
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
                            DOM.td({style: {verticalAlign: 'middle'}}, "1:11.15"),
                            DOM.td({style: {verticalAlign: 'middle'}}, "Honda FMX 650"),
                            DOM.td({style: {verticalAlign: 'middle'}}, "Group 3B"),
                            DOM.td({style: {verticalAlign: 'middle'}}, "22"),
                            DOM.td({style: {verticalAlign: 'middle'}}, "Sommmmm Team")
                        ]),
                        DOM.tr({className: 'selected-row-after'}, [
                            DOM.td({}),
                            DOM.td({}),
                            DOM.td({colSpan: '4'}, [
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
                            DOM.td({}, "4"),
                            DOM.td({}, DOM.span({className: 'race-number'}, "42")),
                            DOM.td({}, DOM.img({height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif'})),
                            DOM.td({}, "Vyacheslav Goldenshteyn"),
                            DOM.td({}, "1:11.15"),
                            DOM.td({}, "Honda FMX 650"),
                            DOM.td({}, "Group 3B"),
                            DOM.td({}, "22"),
                            DOM.td({}, "Sommmmm Team")
                        ])
                    ])
                ])
            ]);
        }
    }

    return ResultsView;
});
