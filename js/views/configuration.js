'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'components/editable-table', 'components/text-cell', 'components/select-cell', 'components/stopwatch-cell', 'components/toggle-cell', 'components/country-flag', 'utils/commons', 'static-data/countries', 'static-data/penalty-type'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, EditableTableView, TextCellView, SelectCellView, StopwatchCellView, ToggleCellView, CountryFlagView, Commons, countries, PenaltyType) {
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
            var _this = this;

            _classCallCheck(this, PenaltyRenderer);

            _get(Object.getPrototypeOf(PenaltyRenderer.prototype), 'constructor', this).call(this, props);

            var penalty = this.state.item;

            this.name = Shuttle.ref(penalty.name);
            this.description = Shuttle.ref(penalty.description);
            this.delay = Shuttle.ref(penalty.delay);
            this.type = Shuttle.ref(penalty.type);

            Shuttle.combine([this.name, this.description, this.delay, this.type], function (name, description, delay, type) {
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
        }

        _createClass(PenaltyRenderer, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;
                var participant = this.state.item;

                var validationStatus = !R.isEmpty(participant.name) && !R.isEmpty(participant.motorcycle) && !R.isEmpty(participant.group) && !R.isEmpty(participant.team);

                return DOM.tr({
                    key: 'row',
                    className: this.props.last ? "" : validationStatus ? 'list-group-item-success' : 'list-group-item-danger'
                }, [DOM.td({ key: 'trash', style: { width: '24px' } }, this.props.deleteButton), DOM.td({ key: 'name', className: 'col-md-2' }, React.createElement(TextCellView, {
                    key: 'name-cell',
                    value: this.name
                })), DOM.td({ key: 'description', className: 'col-md-4' }, React.createElement(TextCellView, {
                    key: 'description-cell',
                    value: this.description
                })), DOM.td({ key: 'delay', className: 'col-md-2' }, React.createElement(StopwatchCellView, {
                    key: 'delay-cell',
                    value: this.delay
                })), DOM.td({ key: 'type', className: 'col-md-3' }, DOM.div({
                    key: 'type-inner',
                    style: { height: '20px' }
                }, React.createElement(SelectCellView, {
                    key: 'type-cell',
                    value: this.type,
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

    var ConfigurationView = (function (_React$Component3) {
        _inherits(ConfigurationView, _React$Component3);

        function ConfigurationView(props) {
            var _this3 = this;

            _classCallCheck(this, ConfigurationView);

            _get(Object.getPrototypeOf(ConfigurationView.prototype), 'constructor', this).call(this, props);

            var configuration = this.props.configuration.get();

            this.name = Shuttle.ref(configuration.name);
            this.penalties = Shuttle.ref(R.values(configuration.penalties));
            this.countries = Shuttle.ref(configuration.countries);

            this.countrySubArrays = R.mapObj(R.compose(R.splitEvery(8), R.map(function (country) {
                var item = Shuttle.ref({
                    selected: R.findIndex(R.equals(country), configuration.countries) > -1,
                    country: country
                });

                item.addListener(function (_, item) {
                    if (item.selected) {
                        _this3.countries.set(R.append(item.country, _this3.countries.get()));
                    } else {
                        var index = R.findIndex(R.equals(item.country), _this3.countries.get());

                        if (index > -1) {
                            _this3.countries.set(R.remove(index, _this3.countries.get()));
                        }
                    }
                });

                return item;
            })), R.groupBy(function (country) {
                return country.continentName;
            }, R.dropLast(0, countries)));

            Shuttle.combine([this.name, this.penalties.map(R.reduce(function (result, item) {
                return R.assoc(item.get().id, item, result);
            }, {})), this.countries.map(R.filter(function (i) {
                return i;
            }))], function (name, penalties, countries) {
                return R.identity({
                    name: name,
                    penalties: penalties,
                    countries: countries
                });
            }).log().addListener(function (_, computed) {
                return _this3.props.configuration.set(computed);
            });
        }

        _createClass(ConfigurationView, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;
                var eventId = this.props.params.eventId;

                return DOM.div({}, [React.createElement(ReactBootstrap.Pager, {}, [React.createElement(ReactBootstrap.PageItem, { href: '#event/' + eventId + '/configuration' }, "Configuration"), React.createElement(ReactBootstrap.PageItem, { next: true, href: '#event/' + eventId + '/registration' }, ["Registration", ' ', React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-right' })])]), DOM.div({}, [DOM.form({ className: 'form-horizontal' }, [DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-md-1' }, DOM.span({}, "Name")), React.createElement(NameInput, {
                    name: this.name
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
                    items: this.penalties,
                    getId: function getId(penalty) {
                        return penalty.id;
                    },
                    isEmpty: function isEmpty(penalty) {
                        return R.isEmpty(penalty.name) && R.isEmpty(penalty.description) && R.isEmpty(penalty.delay) && R.isEmpty(penalty.type);
                    },
                    headerRenderer: PenaltiesHeaderRenderer,
                    footerRenderer: PenaltiesFooterRenderer,
                    itemRenderer: PenaltyRenderer
                }))]), DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-md-1' }, DOM.span({}, "Countries")), DOM.div({ className: 'col-md-7' }, R.flatten(R.values(R.mapObjIndexed(function (countrySubArrays, continentName) {
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
                }, this.countrySubArrays))))])])])]);
            }
        }]);

        return ConfigurationView;
    })(React.Component);

    window.c = countries;

    return ConfigurationView;
});

//# sourceMappingURL=configuration.js.map