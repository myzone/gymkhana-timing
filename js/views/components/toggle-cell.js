'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) {
    var ToggleCellView = (function (_Shuttle$React$Component) {
        _inherits(ToggleCellView, _Shuttle$React$Component);

        function ToggleCellView() {
            _classCallCheck(this, ToggleCellView);

            _get(Object.getPrototypeOf(ToggleCellView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(ToggleCellView, [{
            key: 'render',
            value: function render() {
                var _this = this;

                var renderer = this.props.renderer;
                var toggle = this.props.toggle;
                var active = this.props.active;

                return React.createElement(ReactBootstrap.Button, {
                    bsStyle: active(this.state.value) ? 'primary' : 'default',
                    onClick: function onClick() {
                        return _this.props.value.set(toggle(_this.state.value));
                    }
                }, renderer(this.state.value));
            }
        }]);

        return ToggleCellView;
    })(Shuttle.React.Component);

    return ToggleCellView;
});

//# sourceMappingURL=toggle-cell.js.map