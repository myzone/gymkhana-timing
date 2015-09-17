'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['shuttle', 'ramda', 'react'], function (Shuttle, R, React) {
    var ShuttleReactComponent = (function (_React$Component) {
        _inherits(ShuttleReactComponent, _React$Component);

        function ShuttleReactComponent(props) {
            var _this = this;

            _classCallCheck(this, ShuttleReactComponent);

            _get(Object.getPrototypeOf(ShuttleReactComponent.prototype), 'constructor', this).call(this, props);

            this.updateListener = function (a, b) {
                return _this.setState(_this.computeState(_this.props, _this.state));
            };
            this.state = this.computeState(this.props, {});
            this.lastState = this.state;
        }

        // publish

        _createClass(ShuttleReactComponent, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                R.forEach(function (shuttleProp) {
                    return shuttleProp.value.addListener(_this2.updateListener);
                }, this.getShuttleProps(this.props));
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                var _this3 = this;

                R.forEach(function (shuttleProp) {
                    return shuttleProp.value.removeListener(_this3.updateListener);
                }, this.getShuttleProps(this.props));
            }

            //shouldComponentUpdate(nextProps, nextState) {
            //    return !R.equals(nextProps, this.props)
            //        || !R.equals(this.computeState(nextProps, nextState), R.equals(this.computeState(this.props, this.lastState)));
            //}

        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(props) {
                this.setState(this.computeState(props, this.lastState));
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps, prevState) {
                this.lastState = prevState;
            }
        }, {
            key: 'computeState',
            value: function computeState(props, state) {
                return R.reduce(function (object, prop) {
                    object[prop.key] = prop.value.get();

                    return object;
                }, state, this.getShuttleProps(props));
            }
        }, {
            key: 'getShuttleProps',
            value: function getShuttleProps(props) {
                var _this4 = this;

                return R.filter(function (prop) {
                    return prop.value instanceof Shuttle.Ref;
                }, R.map(function (key) {
                    return {
                        key: key,
                        value: _this4.props[key]
                    };
                }, Object.keys(props)));
            }
        }]);

        return ShuttleReactComponent;
    })(React.Component);

    Shuttle.React = {
        Component: ShuttleReactComponent
    };

    return 'use Shuttle.React.Component';
});

//# sourceMappingURL=shuttle-react-snapshot.js.map