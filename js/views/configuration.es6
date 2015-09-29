define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'static-data/countries'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, countries) => {
    const countrySubArrays = R.splitEvery(10, countries);

    class ConfigurationView extends React.Component {
        render() {
            const DOM = React.DOM;

            const eventId = this.props.params.eventId;
            const nameIsOk = false;

            return DOM.div({}, [
                React.createElement(ReactBootstrap.Pager, {}, [
                    React.createElement(ReactBootstrap.PageItem, {href: `#event/${eventId}/configuration`}, "Configuration"),
                    React.createElement(ReactBootstrap.PageItem, {next: true, href: `#event/${eventId}/registration`}, [
                        "Registration", ' ', React.createElement(ReactBootstrap.Glyphicon, {glyph: 'menu-right'})
                    ])
                ]),

                DOM.div({}, [
                    DOM.form({className: 'form-horizontal'}, [
                        React.createElement(ReactBootstrap.Input, {
                            label: "Name",

                            type: 'text',
                            labelClassName: 'col-md-1',
                            wrapperClassName: 'col-md-7',

                            bsStyle: nameIsOk ? 'success' : 'error',
                            hasFeedback: true,
                            defaultValue: "",
                            onChange: (e) => this.setState({name: e.target.value})
                        }),
                        DOM.div({className: 'form-group'}, [
                            DOM.label({className: 'control-label col-md-1'}, DOM.span({}, "Countries")),
                            DOM.div({className: 'col-md-11'}, DOM.table({}))
                        ]),
                        DOM.div({className: 'form-group'}, [
                            DOM.label({className: 'control-label col-md-1'}, DOM.span({}, "Countries")),
                            DOM.div({className: 'col-md-11'}, DOM.table({className: 'btn-array btn-block'}, [
                                DOM.tbody({}, [
                                    R.map(countrySubArray => DOM.tr({style: {width: '100%'}}, [
                                        R.map(country => DOM.td({}, React.createElement(ReactBootstrap.Button, {}, [
                                            DOM.img({
                                                key: 'image',
                                                style: {width: 'auto', height: '20px'},
                                                src: `http://www.geonames.org/flags/x/${country.countryCode}.gif`
                                            })
                                        ])), countrySubArray)
                                    ]), countrySubArrays)
                                ])
                            ]))
                        ])
                    ])
                ])
            ]);
        }
    }

    window.c = countries;

    return ConfigurationView;
});
