'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'react-input-mask', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'moment-durations', 'utils/commons'], function (React, ReactBootstrap, InputElement, R, Shuttle, ShuttleReact, moment, momentDurations, Commons) {
    var StopwatchCellView = (function (_Shuttle$React$Component) {
        _inherits(StopwatchCellView, _Shuttle$React$Component);

        function StopwatchCellView() {
            _classCallCheck(this, StopwatchCellView);

            _get(Object.getPrototypeOf(StopwatchCellView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(StopwatchCellView, [{
            key: 'render',
            value: function render() {
                var _this = this;

                var duration = this.state.value;
                var rendered = duration ? duration.format('mm:ss.SSS', { trim: false }) : '__:__.___';

                return React.createElement(InputElement, {
                    mask: '99:99.999',
                    className: this.props.className,
                    style: this.props.style,
                    value: !this.state.focused ? rendered : undefined,
                    defaultValue: this.state.focused ? rendered : undefined,
                    onChange: function onChange(event) {
                        var val = event.target.value;

                        var res1 = R.split(':', val);
                        var res2 = res1[1] ? R.split('.', res1[1]) : ['0', '0'];

                        var replace_With0 = R.replace(/_/g, '0');
                        var duration = moment.duration({
                            m: replace_With0(res1[0]),
                            s: replace_With0(res2[0]),
                            ms: replace_With0(res2[1])
                        });
                        _this.props.value.set(duration.asMilliseconds() != 0 ? duration : null);
                    },
                    onFocus: function onFocus() {
                        return _this.setState({ focused: true });
                    },
                    onBlur: function onBlur() {
                        return _this.setState({ focused: false });
                    }
                });
            }
        }]);

        return StopwatchCellView;
    })(Shuttle.React.Component);

    return StopwatchCellView;
});

//# sourceMappingURL=stopwatch-cell.js.map