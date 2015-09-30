define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'components/editable-table', 'components/text-cell', 'components/select-cell', 'components/stopwatch-cell', 'components/toggle-cell', 'utils/commons', 'static-data/countries', 'static-data/penalty-type'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, EditableTableView, TextCellView, SelectCellView, StopwatchCellView, ToggleCellView, Commons, countries, PenaltyType) => {
    class PenaltiesHeaderRenderer extends React.Component {

        render() {
            const DOM = React.DOM;

            return DOM.tr({key: 'head-row'}, [
                DOM.th({key: 'id-header'}),
                DOM.th({key: 'name-header'}, "Name"),
                DOM.th({key: 'description-header'}, "Description"),
                DOM.th({key: 'delay-header'}, "Delay"),
                DOM.th({key: 'type-header'}, "Type")
            ]);
        }

    }

    class PenaltiesFooterRenderer extends React.Component {

        render() {
            return React.DOM.tr({key: 'foot-row'});
        }

    }

    class PenaltyRenderer extends Shuttle.React.Component {

        name;
        description;
        delay;
        type;

        constructor(props) {
            super(props);

            const penalty = this.state.item;

            this.name = Shuttle.ref(penalty.name);
            this.description = Shuttle.ref(penalty.description);
            this.delay = Shuttle.ref(penalty.delay);
            this.type = Shuttle.ref(penalty.type);

            Shuttle
                .combine([this.name, this.description, this.delay, this.type], (name, description, delay, type) => {
                    return {
                        id: penalty.id,
                        name: name,
                        description: description,
                        delay: delay,
                        type: type
                    }
                })
                .addListener((_, computed) => this.props.item.set(computed));
        }

        render() {
            const DOM = React.DOM;
            const participant = this.state.item;

            const validationStatus = !R.isEmpty(participant.name)
                && !R.isEmpty(participant.motorcycle)
                && !R.isEmpty(participant.group)
                && !R.isEmpty(participant.team);

            return DOM.tr({
                key: 'row',
                className: this.props.last ? "" : validationStatus ? 'list-group-item-success' : 'list-group-item-danger'
            }, [
                DOM.td({key: 'trash', style: {width: '24px'}}, this.props.deleteButton),

                DOM.td({key: 'name', className: 'col-md-2'}, React.createElement(TextCellView, {
                    key: 'name-cell',
                    value: this.name
                })),

                DOM.td({key: 'description', className: 'col-md-4'}, React.createElement(TextCellView, {
                    key: 'description-cell',
                    value: this.description
                })),

                DOM.td({key: 'delay', className: 'col-md-2'}, React.createElement(StopwatchCellView, {
                    key: 'delay-cell',
                    value: this.delay
                })),

                DOM.td({key: 'type', className: 'col-md-3'}, DOM.div({
                    key: 'type-inner',
                    style: {height: '20px'}
                }, React.createElement(SelectCellView, {
                    key: 'type-cell',
                    value: this.type,
                    items: [
                        PenaltyType.NEGLIGIBLE,
                        PenaltyType.SIGNIFICANT,
                        PenaltyType.CRITICAL
                    ],
                    renderer: (item) => DOM.div({
                        style: {
                            display: 'inline-block',
                            width: '70px'
                        }
                    }, item ? R.head(R.toUpper(item)) + R.tail(item) : '')
                }))),

                DOM.td({key: 'validation'}, this.props.last ? "" : validationStatus
                    ? React.createElement(ReactBootstrap.Glyphicon, {glyph: 'ok'})
                    : React.createElement(ReactBootstrap.Glyphicon, {glyph: 'remove'}))
            ]);
        }

    }

    class NameInput extends Shuttle.React.Component {

        render() {
            const nameIsOk = this.validateName();

            return React.createElement(ReactBootstrap.Input, {
                type: 'text',
                wrapperClassName: 'col-md-7',

                bsStyle: nameIsOk ? 'success' : 'error',
                hasFeedback: true,
                value: this.state.name,
                onChange: e => this.props.name.set(e.target.value)
            });
        }

        validateName() {
            return !R.isEmpty(this.state.name);
        }

    }

    class ConfigurationView extends React.Component {

        name;
        penalties;
        countries;

        countrySubArrays;

        constructor(props) {
            super(props);

            const configuration = this.props.configuration.get();

            this.name = Shuttle.ref(configuration.name);
            this.penalties = Shuttle.ref(R.values(configuration.penalties));
            this.countries = Shuttle.ref(configuration.countries);

            this.countrySubArrays = R.mapObj(R.compose(R.splitEvery(10), R.map(country => {
                const item = Shuttle.ref({
                    selected: R.findIndex(R.equals(country), configuration.countries) > -1,
                    country: country
                });

                item.addListener((_, item) => {
                    if (item.selected) {
                        this.countries.set(R.append(item.country, this.countries.get()))
                    } else {
                        const index = R.findIndex(R.equals(item.country), this.countries.get());

                        if (index > -1) {
                            this.countries.set(R.remove(index, this.countries.get()))
                        }
                    }
                });

                return item;
            })), R.groupBy(country => country.continentName, R.dropLast(0, countries)));

            Shuttle
                .combine([this.name, this.penalties.map(R.reduce((result, item) => R.assoc(item.get().id, item, result), {})), this.countries.map(R.filter(i => i))], (name, penalties, countries) => R.identity({
                    name: name,
                    penalties: penalties,
                    countries: countries
                }))
                .log()
                .addListener((_, computed) => this.props.configuration.set(computed));
        }

        render() {
            const DOM = React.DOM;
            const eventId = this.props.params.eventId;

            return DOM.div({}, [
                React.createElement(ReactBootstrap.Pager, {}, [
                    React.createElement(ReactBootstrap.PageItem, {href: `#event/${eventId}/configuration`}, "Configuration"),
                    React.createElement(ReactBootstrap.PageItem, {next: true, href: `#event/${eventId}/registration`}, [
                        "Registration", ' ', React.createElement(ReactBootstrap.Glyphicon, {glyph: 'menu-right'})
                    ])
                ]),

                DOM.div({}, [
                    DOM.form({className: 'form-horizontal'}, [
                        DOM.div({className: 'form-group'}, [
                            DOM.label({className: 'control-label col-md-1'}, DOM.span({}, "Name")),
                            React.createElement(NameInput, {
                                name: this.name
                            })
                        ]),

                        DOM.div({className: 'form-group'}, [
                            DOM.label({className: 'control-label col-md-1'}, DOM.span({}, "Penalties")),
                            DOM.div({className: 'col-md-7'}, React.createElement(EditableTableView, {
                                generateNextDefault: () => Shuttle.ref({
                                    id: Commons.guid(),
                                    name: "",
                                    description: "",
                                    delay: null,
                                    type: ""
                                }),
                                items: this.penalties,
                                getId: penalty => penalty.id,
                                isEmpty: penalty => R.isEmpty(penalty.name)
                                && R.isEmpty(penalty.description)
                                && R.isEmpty(penalty.delay)
                                && R.isEmpty(penalty.type),
                                headerRenderer: PenaltiesHeaderRenderer,
                                footerRenderer: PenaltiesFooterRenderer,
                                itemRenderer: PenaltyRenderer
                            }))
                        ]),

                        DOM.div({className: 'form-group'}, [
                            DOM.label({className: 'control-label col-md-1'}, DOM.span({}, "Countries")),
                            DOM.div({className: 'col-md-7'}, R.flatten(R.values(R.mapObjIndexed((countrySubArrays, continentName) => [
                                DOM.h4({className: 'col-md-7'}, continentName),
                                DOM.div({className: 'btn-array col-md-7'}, [
                                    R.map(countrySubArray => DOM.div({className: 'btn-array-row'}, [
                                        R.map(country => DOM.span({className: 'btn-array-cell'}, React.createElement(ToggleCellView, {
                                            value: country,
                                            toggle: item => R.assoc('selected', !item.selected, item),
                                            active: item => item.selected,
                                            style: {
                                                width: '80px',
                                                height: '40px'
                                            },
                                            renderer: item => React.createElement(ReactBootstrap.OverlayTrigger, {
                                                    placement: 'top',
                                                    delayShow: 750,
                                                    overlay: React.createElement(ReactBootstrap.Tooltip, {}, item.country.countryName)
                                                }, DOM.div({style: {marginTop: '-2px'}}, [
                                                    DOM.div({
                                                        key: 'image',
                                                        style: {
                                                            height: '30px',
                                                            background: `url(http://www.geonames.org/flags/m/${R.toLower(item.country.countryCode)}.png) center`,
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundSize: 'auto 30px'
                                                        }
                                                    }),
                                                    DOM.div({
                                                        style: {
                                                            marginTop: '-33px',
                                                            lineHeight: '36px',
                                                            fontSize: '34px',
                                                            fontWeight: '100',
                                                            color: 'black',
                                                            textShadow: '1px 1px 1px rgba(255, 255, 255, 0.3), -1px -1px 1px rgba(255, 255, 255, 0.3), 1px -1px 1px rgba(255, 255, 255, 0.3), -1px 1px 1px rgba(255, 255, 255, 0.3)'
                                                        }
                                                    }, item.country.countryCode)])
                                            )
                                        })), countrySubArray)
                                    ]), countrySubArrays)
                                ])

                            ], this.countrySubArrays))))
                        ])
                    ])
                ])
            ]);
        }

    }

    window.c = countries;

    return ConfigurationView;
});


