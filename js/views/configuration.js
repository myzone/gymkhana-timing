'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'components/editable-table', 'components/text-cell', 'components/select-cell', 'components/stopwatch-cell', 'components/toggle-cell', 'components/country-flag', 'utils/commons', 'static-data/countries', 'static-data/penalty-type'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, EditableTableView, TextCellView, SelectCellView, StopwatchCellView, ToggleCellView, CountryFlagView, Commons, COUNTRIES, PenaltyType) {
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
                }, [DOM.td({ key: 'trash', style: { width: '24px' } }, this.props.deleteButton), DOM.td({ key: 'name', className: 'col-md-2' }, React.createElement(TextCellView, {
                    key: 'name-cell',
                    value: name
                })), DOM.td({ key: 'description', className: 'col-md-4' }, React.createElement(TextCellView, {
                    key: 'description-cell',
                    value: description
                })), DOM.td({ key: 'delay', className: 'col-md-2' }, React.createElement(StopwatchCellView, {
                    key: 'delay-cell',
                    value: delay
                })), DOM.td({ key: 'type', className: 'col-md-3' }, DOM.div({
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

    var NameInput = (function (_Shuttle$React$Component2) {
        _inherits(NameInput, _Shuttle$React$Component2);

        function NameInput() {
            _classCallCheck(this, NameInput);

            _get(Object.getPrototypeOf(NameInput.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(NameInput, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                var nameIsOk = this.validateName();

                return React.createElement(ReactBootstrap.Input, {
                    type: 'text',
                    wrapperClassName: 'col-md-7',

                    bsStyle: nameIsOk ? 'success' : 'error',
                    hasFeedback: true,
                    value: this.state.name,
                    onChange: function onChange(e) {
                        return _this2.props.name.set(e.target.value);
                    }
                });
            }
        }, {
            key: 'validateName',
            value: function validateName() {
                return !R.isEmpty(this.state.name);
            }
        }]);

        return NameInput;
    })(Shuttle.React.Component);

    var ConfigurationView = (function (_Shuttle$React$Component3) {
        _inherits(ConfigurationView, _Shuttle$React$Component3);

        function ConfigurationView(props) {
            _classCallCheck(this, ConfigurationView);

            _get(Object.getPrototypeOf(ConfigurationView.prototype), 'constructor', this).call(this, props);
        }

        _createClass(ConfigurationView, [{
            key: 'render',
            value: function render() {
                var _this3 = this;

                var DOM = React.DOM;
                var eventId = this.props.params.eventId;

                var configuration = this.state.configuration;

                var name = Shuttle.ref(configuration.name);
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
                                countries.set(R.remove(index, countries.get()));
                            }
                        }
                    });

                    return item;
                })), R.groupBy(function (country) {
                    return country.continentName;
                }, R.dropLast(0, COUNTRIES)));

                Shuttle.combine([name, penalties.map(R.reduce(function (result, item) {
                    return R.assoc(item.get().id, item, result);
                }, {})), countries.map(R.filter(function (i) {
                    return i;
                }))], function (name, penalties, countries) {
                    return R.identity({
                        name: name,
                        penalties: penalties,
                        countries: countries
                    });
                }).addListener(function (_, computed) {
                    return _this3.props.configuration.set(computed);
                });

                return DOM.div({}, [React.createElement(ReactBootstrap.Pager, {}, [React.createElement(ReactBootstrap.PageItem, { href: '#event/' + eventId + '/configuration' }, "Configuration"), React.createElement(ReactBootstrap.PageItem, { next: true, href: '#event/' + eventId + '/registration' }, ["Registration", ' ', React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-right' })])]), DOM.div({}, [DOM.form({ className: 'form-horizontal' }, [DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-md-1' }, DOM.span({}, "Name")), React.createElement(NameInput, {
                    name: name
                })]), DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-md-1' }, DOM.span({}, "Penalties")), DOM.div({ className: 'col-md-7' }, React.createElement(EditableTableView, {
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
                }))]), DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-md-1' }, DOM.span({}, "COUNTRIES")), DOM.div({ className: 'col-md-7' }, R.flatten(R.values(R.mapObjIndexed(function (countrySubArrays, continentName) {
                    return [DOM.h4({ className: 'col-md-7' }, continentName), DOM.div({ className: 'btn-array', style: { width: '100%' } }, [R.map(function (countrySubArray) {
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