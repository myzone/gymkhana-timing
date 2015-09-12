define(['react', 'react-bootstrap'], (React, ReactBootstrap) => {
    class RegistrationView extends React.Component {
        render() {
            const DOM = React.DOM;

            return DOM.div({}, [
                React.createElement(ReactBootstrap.Table, {responsive: true, hover: true, striped: true}, [
                    DOM.thead({}, DOM.tr({}, [
                        DOM.td({}, ""),
                        DOM.td({}, "#"),
                        DOM.th({}, "Country"),
                        DOM.th({}, "Name"),
                        DOM.th({}, "Motorcycle"),
                        DOM.th({}, "Group"),
                        DOM.th({}, "Birthday"),
                        DOM.th({}, "Team")
                    ])),
                    DOM.tbody({}, [
                        DOM.tr({}, [
                            DOM.td({style: {width: '24px'}}, React.createElement(ReactBootstrap.Button, {bsSize: 'xsmall'}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'trash'}))),
                            DOM.td({}, DOM.span({className: 'race-number'}, "42")),
                            DOM.td({}, DOM.img({height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif'})),
                            DOM.td({}, "Vyacheslav Goldenshteyn"),
                            DOM.td({}, "Honda FMX 650"),
                            DOM.td({}, "Group 3B"),
                            DOM.td({}, "5.7.1993"),
                            DOM.td({}, "Sommmmm Team")
                        ]),
                        DOM.tr({}, [
                            DOM.td({style: {width: '24px'}}, React.createElement(ReactBootstrap.Button, {bsSize: 'xsmall'}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'trash'}))),
                            DOM.td({}, DOM.span({className: 'race-number'}, "42")),
                            DOM.td({}, DOM.img({height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif'})),
                            DOM.td({}, "Vyacheslav Goldenshteyn"),
                            DOM.td({}, "Honda FMX 650"),
                            DOM.td({}, "Group 3B"),
                            DOM.td({}, "5.7.1993"),
                            DOM.td({}, "Sommmmm Team")
                        ]),
                        DOM.tr({}, [
                            DOM.td({style: {width: '24px'}}, React.createElement(ReactBootstrap.Button, {
                                disabled: true,
                                bsSize: 'xsmall'
                            }, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'trash'}))),
                            DOM.td({}, ""),
                            DOM.td({}, ""),
                            DOM.td({}, ""),
                            DOM.td({}, ""),
                            DOM.td({}, ""),
                            DOM.td({}, ""),
                            DOM.td({}, "")
                        ])
                    ])
                ])
            ]);
        }
    }

    return RegistrationView;
});
