define(['react', 'react-bootstrap', 'react-dropzone', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'components/editable-table', 'components/text-cell', 'components/select-cell', 'components/date-cell', 'components/stopwatch-cell', 'components/toggle-cell', 'components/place-cell', 'components/country-flag', 'utils/commons', 'static-data/countries', 'static-data/penalty-type'], (React, ReactBootstrap, Dropzone, R, Shuttle, ShuttleReact, moment, EditableTableView, TextCellView, SelectCellView, DateCellView, StopwatchCellView, ToggleCellView, PlaceCellView, CountryFlagView, Commons, COUNTRIES, PenaltyType) => {
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

        constructor(props) {
            super(props);
        }

        render() {
            const DOM = React.DOM;
            const penalty = this.state.item;

            const validationStatus = !R.isEmpty(penalty.name)
                && !R.isEmpty(penalty.description)
                && !R.isNil(penalty.delay)
                && !R.isEmpty(penalty.type);

            const name = Shuttle.ref(penalty.name);
            const description = Shuttle.ref(penalty.description);
            const delay = Shuttle.ref(penalty.delay);
            const type = Shuttle.ref(penalty.type);

            Shuttle
                .combine([name, description, delay, type], (name, description, delay, type) => {
                    return {
                        id: penalty.id,
                        name: name,
                        description: description,
                        delay: delay,
                        type: type
                    }
                })
                .addListener((_, computed) => this.props.item.set(computed));

            return DOM.tr({
                key: 'row',
                className: this.props.last ? "" : validationStatus ? 'list-group-item-success' : 'list-group-item-danger'
            }, [
                DOM.td({key: 'trash', style: {width: '24px'}}, this.props.deleteButton),

                DOM.td({key: 'name', className: 'col-md-2'}, React.createElement(TextCellView, {
                    key: 'name-cell',
                    className: 'without-scroll',
                    value: name
                })),

                DOM.td({key: 'description', className: 'col-md-4'}, React.createElement(TextCellView, {
                    key: 'description-cell',
                    className: 'without-scroll',
                    value: description
                })),

                DOM.td({key: 'delay', className: 'col-md-2'}, React.createElement(StopwatchCellView, {
                    key: 'delay-cell',
                    className: 'without-scroll',
                    value: delay
                })),

                DOM.td({key: 'type', className: 'col-md-3'}, DOM.div({
                    key: 'type-inner',
                    style: {height: '20px'}
                }, React.createElement(SelectCellView, {
                    key: 'type-cell',
                    value: type,
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
                groupClassName: 'no-margin',

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

    class PlaceInput extends Shuttle.React.Component {

        render() {
            return React.createElement(ReactBootstrap.Input, {
                type: 'text',
                groupClassName: 'no-margin',

                value: this.state.eventPlace,
                onChange: e => this.props.eventPlace.set(e.target.value)
            });
        }

    }

    class CourseInput extends Shuttle.React.Component {

        render() {
            const DOM = React.DOM;

            return React.createElement(Dropzone, {
                style: {
                    borderWidth: '2px',
                    borderColor: '#666',
                    borderStyle: 'dashed',
                    borderRadius: '5px'
                },
                activeStyle: {
                    height: 'auto',
                    width: 'auto',
                    borderStyle: 'solid',
                    backgroundColor: '#eee'
                },
                multiple: false,
                onDrop: files => {
                    const file = R.head(files);

                    if (file) {
                        const reader = new FileReader();

                        reader.onload = e => {
                            var img = new Image();
                            img.onload = () => this.props.course.set(e.target.result);
                            img.onerror = () => this.props.course.set(null);
                            img.src = e.target.result;
                        };
                        reader.readAsDataURL(file);
                    }
                }
            }, this.state.course
                ? DOM.img({
                    src: this.state.course,
                    style: {
                        height: 'auto',
                        width: '100%'
                    }
                })
                : React.createElement(ReactBootstrap.Jumbotron, {style: {marginBottom: 0}}, DOM.span({style: {
                    marginBottom: '15px',
                    fontSize: '21px',
                    fontWeight: '200'
                }
            }, "Try dropping course layout here or click to select file.")));
        }

    }

    class ConfigurationView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            const DOM = React.DOM;
            const eventId = this.props.params.eventId;

            const configuration = this.state.configuration;

            const name = Shuttle.ref(configuration.name);
            const eventDate = Shuttle.ref(configuration.eventDate);
            const eventPlace = Shuttle.ref(configuration.eventPlace);
            const course = Shuttle.ref(configuration.course);
            const penalties = Shuttle.ref(R.values(configuration.penalties));
            const countries = Shuttle.ref(configuration.countries);

            const countrySubArrays = R.mapObj(R.compose(R.splitEvery(8), R.map(country => {
                const item = Shuttle.ref({
                    selected: R.findIndex(R.equals(country), configuration.countries) > -1,
                    country: country
                });

                item.addListener((_, item) => {
                    if (item.selected) {
                        countries.set(R.append(item.country, countries.get()))
                    } else {
                        const index = R.findIndex(R.equals(item.country), countries.get());

                        if (index > -1) {
                            countries.set(R.remove(index, 1, countries.get()))
                        }
                    }
                });

                return item;
            })), R.groupBy(country => country.continentName, R.dropLast(0, COUNTRIES)));

            Shuttle
                .combine([
                    name,
                    eventDate,
                    eventPlace,
                    course,
                    penalties.map(R.reduce((result, item) => R.assoc(item.get().id, item, result), {})),
                    countries.map(R.filter(i => i))
                ], (name, eventDate, eventPlace, course, penalties, countries) => R.identity({
                        name: name,
                        eventDate: eventDate,
                        eventPlace: eventPlace,
                        course: course,
                        penalties: penalties,
                        countries: countries
                }))
                .addListener((_, computed) => this.props.configuration.set(computed));

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
                            DOM.div({className: 'col-md-7'}, React.createElement(NameInput, {
                                name: name
                            }))
                        ]),

                        DOM.div({className: 'form-group'}, [
                            DOM.label({className: 'control-label col-md-1'}, DOM.span({}, "Date")),
                            DOM.div({className: 'col-md-7 '}, DOM.span({className: 'form-control'}, React.createElement(DateCellView, {
                                value: eventDate
                            })))
                        ]),

                        DOM.div({className: 'form-group'}, [
                            DOM.label({className: 'control-label col-md-1'}, DOM.span({}, "Place")),
                            DOM.div({className: 'col-md-7 '}, React.createElement(PlaceCellView, {
                                value: eventPlace
                            }))
                        ]),

                        DOM.div({className: 'form-group'}, [
                            DOM.label({className: 'control-label col-md-1'}, DOM.span({}, "Course layout")),
                            DOM.div({className: 'col-md-7'}, React.createElement(CourseInput, {
                                course: course
                            }))
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
                                items: penalties,
                                getId: penalty => penalty.id,
                                isEmpty: penalty => R.isEmpty(penalty.name)
                                && R.isEmpty(penalty.description)
                                && R.isNil(penalty.delay)
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
                                DOM.div({className: 'btn-array', style: {width: '100%'}}, [
                                    R.map(countrySubArray => DOM.div({className: 'btn-array-row'}, [
                                        R.map(country => DOM.span({className: 'btn-array-cell'}, React.createElement(ToggleCellView, {
                                            value: country,
                                            toggle: item => R.assoc('selected', !item.selected, item),
                                            active: item => item.selected,
                                            style: {
                                                width: '100%',
                                                height: '40px'
                                            },
                                            renderer: item => React.createElement(CountryFlagView, {
                                                country: item.country
                                            })
                                        })), countrySubArray)
                                    ]), countrySubArrays)
                                ])

                            ], countrySubArrays))))
                        ])
                    ])
                ])
            ]);
        }

    }

    return ConfigurationView;
});


