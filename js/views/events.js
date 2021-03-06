'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'views/delete'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment, DeleteView) {
    var Link2EventView = (function (_Shuttle$React$Component) {
        _inherits(Link2EventView, _Shuttle$React$Component);

        function Link2EventView(params) {
            _classCallCheck(this, Link2EventView);

            _get(Object.getPrototypeOf(Link2EventView.prototype), 'constructor', this).call(this, params);

            this.opened = Shuttle.ref(false);
        }

        _createClass(Link2EventView, [{
            key: 'render',
            value: function render() {
                var _this = this;

                var name = this.state.name;
                var eventDate = this.state.eventDate ? this.state.eventDate.format('Do MMM YYYY') : '';
                var eventPlace = !this.state.eventPlace ? '' : this.state.eventDate ? ', ' + this.state.eventPlace : this.state.eventPlace;

                return React.createElement(ReactBootstrap.ListGroupItem, {}, [React.DOM.a({
                    href: '#/event/' + this.state.id,
                    style: {
                        opacity: name ? 1 : .4
                    }
                }, name || "Empty event name"), React.DOM.small({ style: { color: 'darkgray' } }, ' @' + eventDate + eventPlace), React.createElement(ReactBootstrap.Button, {
                    className: 'pull-right',
                    bsSize: 'xsmall',
                    onClick: function onClick() {
                        return _this.opened.set(true);
                    }
                }, React.createElement(ReactBootstrap.Glyphicon, { key: 'glyph', glyph: 'trash' })), React.createElement(DeleteView, {
                    opened: this.opened,
                    eventName: name,
                    eventId: this.state.id,
                    application: this.props.application
                })]);
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
                var _this2 = this;

                var events = R.map(function (event) {
                    var configuration = event.flatMap(function (e) {
                        return e.configuration;
                    });

                    return {
                        id: event.map(function (event) {
                            return event.id;
                        }),
                        name: configuration.map(function (c) {
                            return c.name;
                        }),
                        eventDate: configuration.map(function (c) {
                            return c.eventDate;
                        }),
                        eventPlace: configuration.map(function (c) {
                            return c.eventPlace;
                        })
                    };
                }, this.state.events);

                return React.createElement(ReactBootstrap.Panel, { header: React.DOM.h4({}, "Events", R.isEmpty(events) && React.DOM.small({ style: { opacity: .4 } }, ' (empty list)')) }, [React.createElement(ReactBootstrap.ListGroup, { key: 'events-list', fill: true }, [R.map(function (event) {
                    return React.createElement(Link2EventView, {
                        key: event.id.get(),
                        id: event.id,
                        name: event.name,
                        eventDate: event.eventDate,
                        eventPlace: event.eventPlace,
                        application: _this2.props.application
                    });
                }, events)])]);
            }
        }]);

        return EventsView;
    })(Shuttle.React.Component);

    return EventsView;
});

//# sourceMappingURL=events.js.map