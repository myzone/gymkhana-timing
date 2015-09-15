'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap'], function (React, ReactBootstrap) {
    var EventsView = (function (_React$Component) {
        _inherits(EventsView, _React$Component);

        function EventsView() {
            _classCallCheck(this, EventsView);

            _get(Object.getPrototypeOf(EventsView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(EventsView, [{
            key: 'render',
            value: function render() {
                return React.createElement(ReactBootstrap.ListGroup, { key: 'events-list' }, [React.createElement(ReactBootstrap.ListGroupItem, { key: '0', href: '#/event/asd1' }, "Championship of Ukraine 2013"), React.createElement(ReactBootstrap.ListGroupItem, { key: '1', href: '#/event/asd2' }, "Championship of Ukraine 2014"), React.createElement(ReactBootstrap.ListGroupItem, { key: '2', href: '#/event/asd3' }, "Championship of Ukraine 2015")]);
            }
        }]);

        return EventsView;
    })(React.Component);

    return EventsView;
});

//# sourceMappingURL=events.js.map