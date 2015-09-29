define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'components/toggle-cell', 'static-data/countries'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, ToggleCellView, countries) => {
    class ConfigurationView extends React.Component {

        countrySubArrays;

        constructor(props) {
            super(props);

            this.countrySubArrays = R.splitEvery(10, R.map(country => Shuttle.ref({
                selected: false,
                country: country
            }), countries));
        }

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
                            DOM.div({className: 'col-md-7'}, DOM.table({}))
                        ]),
                        DOM.div({className: 'form-group'}, [
                            DOM.label({className: 'control-label col-md-1'}, DOM.span({}, "Countries")),
                            DOM.div({className: 'btn-array col-md-7'}, [
                                R.map(countrySubArray => DOM.div({className: 'btn-array-row'}, [
                                    R.map(country => DOM.span({className: 'btn-array-cell'}, React.createElement(ToggleCellView, {
                                        value: country,
                                        toggle: item => R.assoc('selected', !item.selected, item),
                                        active: item => item.selected,
                                        renderer: item => React.createElement(ReactBootstrap.OverlayTrigger, {
                                            placement: 'top',
                                            delayShow: 750,
                                            overlay: React.createElement(ReactBootstrap.Tooltip, {}, item.country.countryName)
                                        }, DOM.img({
                                            key: 'image',
                                            style: {height: '20px'},
                                            src: `http://www.geonames.org/flags/x/${item.country.countryCode}.gif`
                                        }))
                                    })), countrySubArray)
                                ]), this.countrySubArrays)
                            ])
                        ])
                    ])
                ])
            ]);
        }
    }

    window.c = countries;

    return ConfigurationView;
});
