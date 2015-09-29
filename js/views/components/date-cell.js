'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'jquery', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'datetime-picker', 'utils/commons'], function (React, ReactBootstrap, $, R, Shuttle, ShuttleReact, moment, DateTimePicker, Commons) {
    var DateTimePickerView = (function (_React$Component) {
        _inherits(DateTimePickerView, _React$Component);

        function DateTimePickerView() {
            _classCallCheck(this, DateTimePickerView);

            _get(Object.getPrototypeOf(DateTimePickerView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(DateTimePickerView, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this = this;

                $(React.findDOMNode(this.refs.container)).datetimepicker({
                    inline: true,
                    viewMode: 'years',
                    format: 'DD/MM/YYYY',
                    locale: moment.locale()
                }).on('dp.change', function (e) {
                    return _this.props.onChange(e.date);
                });
            }
        }, {
            key: 'render',
            value: function render() {
                return React.DOM.div({ ref: 'container', style: { overflow: 'hidden' } });
            }
        }]);

        return DateTimePickerView;
    })(React.Component);

    var DateCellView = (function (_Shuttle$React$Component) {
        _inherits(DateCellView, _Shuttle$React$Component);

        function DateCellView(props) {
            _classCallCheck(this, DateCellView);

            _get(Object.getPrototypeOf(DateCellView.prototype), 'constructor', this).call(this, props);
        }

        _createClass(DateCellView, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                var value = this.state.value.format('Do MMM YYYY');

                return React.createElement(ReactBootstrap.OverlayTrigger, {
                    ref: 'popover',
                    key: 'cell-overlay',
                    trigger: 'click',
                    rootClose: true,
                    placement: 'bottom',
                    overlay: React.createElement(ReactBootstrap.Popover, { key: 'cell-popover' }, [React.createElement(DateTimePickerView, {
                        key: 'cell-input',
                        ref: 'input',
                        type: "date",
                        defaultValue: value,
                        onChange: function onChange(value) {
                            _this2.props.value.set(value);

                            _this2.refs.popover.hide();
                        }
                    })])
                }, React.DOM.span({ key: 'cell-value', className: 'date-cell' }, value));
            }
        }]);

        return DateCellView;
    })(Shuttle.React.Component);

    return DateCellView;
});

//# sourceMappingURL=date-cell.js.map