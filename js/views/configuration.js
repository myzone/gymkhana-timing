'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'components/toggle-cell', 'static-data/countries'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, ToggleCellView, countries) {
    var ConfigurationView = (function (_React$Component) {
        _inherits(ConfigurationView, _React$Component);

        function ConfigurationView(props) {
            _classCallCheck(this, ConfigurationView);

            _get(Object.getPrototypeOf(ConfigurationView.prototype), 'constructor', this).call(this, props);

            this.countrySubArrays = R.splitEvery(10, R.map(function (country) {
                return Shuttle.ref({
                    selected: false,
                    country: country
                });
            }, countries));
        }

        _createClass(ConfigurationView, [{
            key: 'render',
            value: function render() {
                var _this = this;

                var DOM = React.DOM;

                var eventId = this.props.params.eventId;
                var nameIsOk = false;

                return DOM.div({}, [React.createElement(ReactBootstrap.Pager, {}, [React.createElement(ReactBootstrap.PageItem, { href: '#event/' + eventId + '/configuration' }, "Configuration"), React.createElement(ReactBootstrap.PageItem, { next: true, href: '#event/' + eventId + '/registration' }, ["Registration", ' ', React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-right' })])]), DOM.div({}, [DOM.form({ className: 'form-horizontal' }, [React.createElement(ReactBootstrap.Input, {
                    label: "Name",

                    type: 'text',
                    labelClassName: 'col-md-1',
                    wrapperClassName: 'col-md-7',

                    bsStyle: nameIsOk ? 'success' : 'error',
                    hasFeedback: true,
                    defaultValue: "",
                    onChange: function onChange(e) {
                        return _this.setState({ name: e.target.value });
                    }
                }), DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-md-1' }, DOM.span({}, "Countries")), DOM.div({ className: 'col-md-7' }, DOM.table({}))]), DOM.div({ className: 'form-group' }, [DOM.label({ className: 'control-label col-md-1' }, DOM.span({}, "Countries")), DOM.div({ className: 'btn-array col-md-7' }, [R.map(function (countrySubArray) {
                    return DOM.div({ className: 'btn-array-row' }, [R.map(function (country) {
                        return DOM.span({ className: 'btn-array-cell' }, React.createElement(ToggleCellView, {
                            value: country,
                            toggle: function toggle(item) {
                                return R.assoc('selected', !item.selected, item);
                            },
                            active: function active(item) {
                                return item.selected;
                            },
                            renderer: function renderer(item) {
                                return React.createElement(ReactBootstrap.OverlayTrigger, {
                                    placement: 'top',
                                    delayShow: 750,
                                    overlay: React.createElement(ReactBootstrap.Tooltip, {}, item.country.countryName)
                                }, DOM.img({
                                    key: 'image',
                                    style: { height: '20px' },
                                    src: 'http://www.geonames.org/flags/x/' + item.country.countryCode + '.gif'
                                }));
                            }
                        }));
                    }, countrySubArray)]);
                }, this.countrySubArrays)])])])])]);
            }
        }]);

        return ConfigurationView;
    })(React.Component);

    window.c = countries;

    return ConfigurationView;
});

//# sourceMappingURL=configuration.js.map