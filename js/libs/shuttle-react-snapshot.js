'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['shuttle', 'ramda', 'react'], function (Shuttle, R, React) {
    var ShuttleReactComponent = (function (_React$Component) {
        _inherits(ShuttleReactComponent, _React$Component);

        function ShuttleReactComponent(props) {
            _classCallCheck(this, ShuttleReactComponent);

            _get(Object.getPrototypeOf(ShuttleReactComponent.prototype), 'constructor', this).call(this, props);

            this.state = this.computeState(this.props);
        }

        _createClass(ShuttleReactComponent, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var updateListener = this.updateListener.bind(this);

                R.forEach(function (shuttleProp) {
                    shuttleProp.value.addListener(updateListener);
                }, this.getShuttleProps(this.props));
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                var updateListener = this.updateListener.bind(this);

                R.forEach(function (shuttleProp) {
                    shuttleProp.value.removeListener(updateListener);
                }, this.getShuttleProps(this.props));
            }
        }, {
            key: 'getShuttleProps',
            value: function getShuttleProps(props) {
                var _this = this;

                return R.filter(function (prop) {
                    return prop.value instanceof Shuttle.Ref;
                }, R.map(function (key) {
                    return {
                        key: key,
                        value: _this.props[key]
                    };
                }, Object.keys(props)));
            }
        }, {
            key: 'updateListener',
            value: function updateListener(_1, _2) {
                this.setState(this.computeState(this.props));
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps() {
                this.updateListener();
            }
        }, {
            key: 'computeState',
            value: function computeState(props) {
                return R.reduce(function (object, prop) {
                    object[prop.key] = prop.value.get();

                    return object;
                }, {}, this.getShuttleProps(props));
            }
        }, {
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps, nextState) {
                var computedState = this.computeState(nextProps);

                //return !R.reduce(R.and, true, R.map((key) {
                //        return R.eqDeep(computedState[key], this.state ? this.state[key] : null);
                //    }.bind(this), Object.keys(computedState))) || R.eq(nextState, this.state);

                return !R.eqDeep(this.computeState(nextProps), this.state);
            }
        }]);

        return ShuttleReactComponent;
    })(React.Component);

    ;

    // publish
    Shuttle.React = {
        Component: ShuttleReactComponent
    };

    return 'use Shuttle.React.Component';
});

//# sourceMappingURL=shuttle-react-snapshot.js.map