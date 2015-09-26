'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment) {
    var Link2EventView = (function (_Shuttle$React$Component) {
        _inherits(Link2EventView, _Shuttle$React$Component);

        function Link2EventView() {
            _classCallCheck(this, Link2EventView);

            _get(Object.getPrototypeOf(Link2EventView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(Link2EventView, [{
            key: 'render',
            value: function render() {
                return React.createElement(ReactBootstrap.ListGroupItem, {
                    key: '0',
                    href: '#/event/' + this.state.id
                }, this.state.name);
            }
        }]);

        return Link2EventView;
    })(Shuttle.React.Component);

    var EventsView = (function (_Shuttle$React$Component2) {
        _inherits(EventsView, _Shuttle$React$Component2);

        function EventsView() {
            _classCallCheck(this, EventsView);

            _get(Object.getPrototypeOf(EventsView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(EventsView, [{
            key: 'render',
            value: function render() {
                var events = R.map(function (event) {
                    return {
                        id: event.map(function (event) {
                            return event.id;
                        }),
                        name: event.flatMap(function (e) {
                            return e.configuration;
                        }).map(function (c) {
                            return c.name;
                        })
                    };
                }, this.state.events);

                return React.createElement(ReactBootstrap.ListGroup, { key: 'events-list' }, [R.map(function (event) {
                    return React.createElement(Link2EventView, {
                        key: event.id.get(),
                        id: event.id,
                        name: event.name
                    });
                }, events)]);
            }
        }]);

        return EventsView;
    })(Shuttle.React.Component);

    return EventsView;
});

//# sourceMappingURL=events.js.map