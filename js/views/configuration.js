'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'react-dropzone', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'components/editable-table', 'components/text-cell', 'components/select-cell', 'components/date-cell', 'components/stopwatch-cell', 'components/toggle-cell', 'components/country-flag', 'utils/commons', 'static-data/countries', 'static-data/penalty-type'], function (React, ReactBootstrap, Dropzone, R, Shuttle, ShuttleReact, moment, EditableTableView, TextCellView, SelectCellView, DateCellView, StopwatchCellView, ToggleCellView, CountryFlagView, Commons, COUNTRIES, PenaltyType) {
    var PenaltiesHeaderRenderer = (function (_React$Component) {
        _inherits(PenaltiesHeaderRenderer, _React$Component);

        function PenaltiesHeaderRenderer() {
            _classCallCheck(this, PenaltiesHeaderRenderer);

            _get(Object.getPrototypeOf(PenaltiesHeaderRenderer.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(PenaltiesHeaderRenderer, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;

                return DOM.tr({ key: 'head-row' }, [DOM.th({ key: 'id-header' }), DOM.th({ key: 'name-header' }, "Name"), DOM.th({ key: 'description-header' }, "Description"), DOM.th({ key: 'delay-header' }, "Delay"), DOM.th({ key: 'type-header' }, "Type")]);
            }
        }]);

        return PenaltiesHeaderRenderer;
    })(React.Component);

    var PenaltiesFooterRenderer = (function (_React$Component2) {
        _inherits(PenaltiesFooterRenderer, _React$Component2);

        function PenaltiesFooterRenderer() {
            _classCallCheck(this, PenaltiesFooterRenderer);

            _get(Object.getPrototypeOf(PenaltiesFooterRenderer.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(PenaltiesFooterRenderer, [{
            key: 'render',
            value: function render() {
                return React.DOM.tr({ key: 'foot-row' });
            }
        }]);

        return PenaltiesFooterRenderer;
    })(React.Component);

    var PenaltyRenderer = (function (_Shuttle$React$Component) {
        _inherits(PenaltyRenderer, _Shuttle$React$Component);

        function PenaltyRenderer(props) {
            _classCallCheck(this, PenaltyRenderer);

            _get(Object.getPrototypeOf(PenaltyRenderer.prototype), 'constructor', this).call(this, props);
        }

        _createClass(PenaltyRenderer, [{
            key: 'render',
            value: function render() {
                var _this = this;

                var DOM = React.DOM;
                var penalty = this.state.item;

                var validationStatus = !R.isEmpty(penalty.name) && !R.isEmpty(penalty.description) && !R.isNil(penalty.delay) && !R.isEmpty(penalty.type);

                var name = Shuttle.ref(penalty.name);
                var description = Shuttle.ref(penalty.description);
                var delay = Shuttle.ref(penalty.delay);
                var type = Shuttle.ref(penalty.type);

                Shuttle.combine([name, description, delay, type], function (name, description, delay, type) {
                    return {
                        id: penalty.id,
                        name: name,
                        description: description,
                        delay: delay,
                        type: type
                    };
                }).addListener(function (_, computed) {
                    return _this.props.item.set(computed);
                });

                return DOM.tr({
                    key: 'row',
                    className: this.props.last ? "" : validationStatus ? 'list-group-item-success' : 'list-group-item-danger'
                }, [DOM.td({ key: 'trash', style: { width: '24px' } }, this.props.deleteButton), DOM.td({ key: 'name', className: 'col-sm-2' }, React.createElement(TextCellView, {
                    key: 'name-cell',
                    className: 'without-scroll',
                    value: name
                })), DOM.td({ key: 'description', className: 'col-sm-4' }, React.createElement(TextCellView, {
                    key: 'description-cell',
                    className: 'without-scroll',
                    value: description
                })), DOM.td({ key: 'delay', className: 'col-sm-2' }, React.createElement(StopwatchCellView, {
                    key: 'delay-cell',
                    className: 'without-scroll',
                    value: delay
                })), DOM.td({ key: 'type', className: 'col-sm-3' }, DOM.div({
                    key: 'type-inner',
                    style: { height: '20px' }
                }, React.createElement(SelectCellView, {
                    key: 'type-cell',
                    value: type,
                    items: [PenaltyType.NEGLIGIBLE, PenaltyType.SIGNIFICANT, PenaltyType.CRITICAL],
                    renderer: function renderer(item) {
                        return DOM.div({
                            style: {
                                display: 'inline-block',
                                width: '70px'
                            }
                        }, item ? R.head(R.toUpper(item)) + R.tail(item) : '');
                    }
                }))), DOM.td({ key: 'validation' }, this.props.last ? "" : validationStatus ? React.createElement(ReactBootstrap.Glyphicon, { glyph: 'ok' }) : React.createElement(ReactBootstrap.Glyphicon, { glyph: 'remove' }))]);
            }
        }]);

        return PenaltyRenderer;
    })(Shuttle.React.Component);

    var MappedInput = (function (_Shuttle$React$Component2) {
        _inherits(MappedInput, _Shuttle$React$Component2);

        function MappedInput() {
            _classCallCheck(this, MappedInput);

            _get(Object.getPrototypeOf(MappedInput.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(MappedInput, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _onChange = function _onChange(v) {
                    return _this2.props.value.set(_this2.props.handle(v));
                };
                var value = this.state.value;

                return React.createElement(ReactBootstrap.Input, {
                    type: 'text',
                    groupClassName: 'no-margin',

                    bsStyle: !R.isNil(value) ? 'success' : 'error',
                    hasFeedback: true,
                    value: !R.isNil(value) ? value : '',
                    onChange: function onChange(e) {
                        return _onChange(e.target.value);
                    }
                });
            }
        }]);

        return MappedInput;
    })(Shuttle.React.Component);

    var CourseInput = (function (_Shuttle$React$Component3) {
        _inherits(CourseInput, _Shuttle$React$Component3);

        function CourseInput() {
            _classCallCheck(this, CourseInput);

            _get(Object.getPrototypeOf(CourseInput.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(CourseInput, [{
            key: 'render',
            value: function render() {
                var _this3 = this;

                var DOM = React.DOM;

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
                    onDrop: function onDrop(files) {
                        var file = R.head(files);

                        if (file) {
                            var reader = new FileReader();

                            reader.onload = function (e) {
                                var img = new Image();
                                img.onload = function () {
                                    return _this3.props.course.set(e.target.result);
                                };
                                img.onerror = function () {
                                    return _this3.props.course.set(null);
                                };
                                img.src = e.target.result;
                            };
                            reader.readAsDataURL(file);
                        }
                    }
                }, this.state.course ? DOM.img({
                    src: this.state.course,
                    style: {
                        height: 'auto',
                        width: '100%'
                    }
                }) : React.createElement(ReactBootstrap.Jumbotron, { style: { marginBottom: 0 } }, DOM.span({ style: {
                        marginBottom: '15px',
                        fontSize: '21px',
                        fontWeight: '200'
                    }
                }, "Try dropping course layout here or click to select file.")));
            }
        }]);

        return CourseInput;
    })(Shuttle.React.Component);

    var ConfigurationView = (function (_Shuttle$React$Component4) {
        _inherits(ConfigurationView, _Shuttle$React$Component4);

        function ConfigurationView(props) {
            _classCallCheck(this, ConfigurationView);

            _get(Object.getPrototypeOf(ConfigurationView.prototype), 'constructor', this).call(this, props);
        }

        _createClass(ConfigurationView, [{
            key: 'render',
            value: function render() {
                var _this4 = this;

                var DOM = React.DOM;
                var eventId = this.props.params.eventId;

                var configuration = this.state.configuration;

                var name = Shuttle.ref(configuration.name);
                var eventDate = Shuttle.ref(configuration.eventDate);
                var eventPlace = Shuttle.ref(configuration.eventPlace);
                var heatCount = Shuttle.ref(configuration.heatCount);
                var course = Shuttle.ref(configuration.course);
                var penalties = Shuttle.ref(R.values(configuration.penalties));
                var countries = Shuttle.ref(configuration.countries);

                var countrySubArrays = R.mapObj(R.compose(R.splitEvery(8), R.map(function (country) {
                    var item = Shuttle.ref({
                        selected: R.findIndex(R.equals(country), configuration.countries) > -1,
                        country: country
                    });

                    item.addListener(function (_, item) {
                        if (item.selected) {
                            countries.set(R.append(item.country, countries.get()));
                        } else {
                            var index = R.findIndex(R.equals(item.country), countries.get());

                            if (index > -1) {
                                countries.set(R.remove(index, 1, countries.get()));
                            }
                        }
                    });

                    return item;
                })), R.groupBy(function (country) {
                    return country.continentName;
                }, R.dropLast(0, COUNTRIES)));

                Shuttle.combine([name, eventDate, eventPlace, heatCount, course, penalties.map(R.reduce(function (result, item) {
                    return R.assoc(item.get().id, item, result);
                }, {})), countries.map(R.filter(function (i) {
                    return i;
                }))], function (name, eventDate, eventPlace, heatCount, course, penalties, countries) {
                    return R.identity({
                        name: name,
                        eventDate: eventDate,
                        eventPlace: eventPlace,
                        heatCount: heatCount,
                        course: course,
                        penalties: penalties,
                        countries: countries
                    });
                }).addListener(function (_, computed) {
                    return _this4.props.configuration.set(computed);
                });

                return DOM.div({}, [React.createElement(ReactBootstrap.Pager, {}, [React.createElement(ReactBootstrap.PageItem, { href: '#event/' + eventId + '/configuration' }, "Configuration"), React.createElement(ReactBootstrap.PageItem, { next: true, href: '#event/' + eventId + '/registration' }, ["Registration", ' ', React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-right' })])]), DOM.div({}, [DOM.form({ className: 'form-horizontal' }, [DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-sm-2' }, DOM.span({}, "Name")), DOM.div({ className: 'col-sm-7' }, React.createElement(MappedInput, {
                    value: name,
                    handle: function handle(name) {
                        return !R.test(/^w*$/g, name) ? name : null;
                    }
                }))]), DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-sm-2' }, DOM.span({}, "Date")), DOM.div({ className: 'col-sm-7 ' }, DOM.span({ className: 'form-control' }, React.createElement(DateCellView, {
                    value: eventDate
                })))]), DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-sm-2' }, DOM.span({}, "Place")), DOM.div({ className: 'col-sm-7 ' }, React.createElement(MappedInput, {
                    value: eventPlace,
                    handle: function handle(place) {
                        return !R.test(/^\s*$/g, place) ? place : null;
                    }
                }))]), DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-sm-2' }, DOM.span({}, "Heat count")), DOM.div({ className: 'col-sm-7' }, React.createElement(MappedInput, {
                    value: heatCount,
                    handle: function handle(heatCount) {
                        return !isNaN(parseInt(heatCount)) ? parseInt(heatCount) : null;
                    }
                }))]), DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-sm-2' }, DOM.span({}, "Course layout")), DOM.div({ className: 'col-sm-7' }, React.createElement(CourseInput, {
                    course: course
                }))]), DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-sm-2' }, DOM.span({}, "Penalties")), DOM.div({ className: 'col-sm-7' }, React.createElement(EditableTableView, {
                    generateNextDefault: function generateNextDefault() {
                        return Shuttle.ref({
                            id: Commons.guid(),
                            name: "",
                            description: "",
                            delay: null,
                            type: ""
                        });
                    },
                    items: penalties,
                    getId: function getId(penalty) {
                        return penalty.id;
                    },
                    isEmpty: function isEmpty(penalty) {
                        return R.isEmpty(penalty.name) && R.isEmpty(penalty.description) && R.isNil(penalty.delay) && R.isEmpty(penalty.type);
                    },
                    headerRenderer: PenaltiesHeaderRenderer,
                    footerRenderer: PenaltiesFooterRenderer,
                    itemRenderer: PenaltyRenderer
                }))]), DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-sm-2' }, DOM.span({}, "Countries")), DOM.div({ className: 'col-sm-7' }, R.flatten(R.values(R.mapObjIndexed(function (countrySubArrays, continentName) {
                    return [DOM.h4({ className: 'col-sm-7' }, continentName), DOM.div({ className: 'btn-array', style: { width: '100%' } }, [R.map(function (countrySubArray) {
                        return DOM.div({ className: 'btn-array-row' }, [R.map(function (country) {
                            return DOM.span({ className: 'btn-array-cell' }, React.createElement(ToggleCellView, {
                                value: country,
                                toggle: function toggle(item) {
                                    return R.assoc('selected', !item.selected, item);
                                },
                                active: function active(item) {
                                    return item.selected;
                                },
                                style: {
                                    width: '100%',
                                    height: '40px'
                                },
                                renderer: function renderer(item) {
                                    return React.createElement(CountryFlagView, {
                                        country: item.country
                                    });
                                }
                            }));
                        }, countrySubArray)]);
                    }, countrySubArrays)])];
                }, countrySubArrays))))])])])]);
            }
        }]);

        return ConfigurationView;
    })(Shuttle.React.Component);

    return ConfigurationView;
});

//# sourceMappingURL=configuration.js.map