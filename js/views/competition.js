'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap'], function (React, ReactBootstrap) {
    var CompetitionView = (function (_React$Component) {
        _inherits(CompetitionView, _React$Component);

        function CompetitionView() {
            _classCallCheck(this, CompetitionView);

            _get(Object.getPrototypeOf(CompetitionView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(CompetitionView, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;

                var eventId = this.props.params.eventId;
                return DOM.div({}, [React.createElement(ReactBootstrap.Pager, {}, [React.createElement(ReactBootstrap.PageItem, { previous: true, href: '#event/' + eventId + '/registration' }, [React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-left' }), ' ', "Registration"]), React.createElement(ReactBootstrap.PageItem, { href: '#event/' + eventId + '/competition' }, "Competition"), React.createElement(ReactBootstrap.PageItem, { next: true, href: '#event/' + eventId + '/results' }, ["Results", ' ', React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-right' })])]), React.createElement(ReactBootstrap.Table, { responsive: true, hover: true, striped: true }, [DOM.tbody({}, [DOM.tr({}, [DOM.td({}, DOM.span({ className: 'race-number' }, "42")), DOM.td({}, DOM.img({ height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif' })), DOM.td({}, "Vyacheslav Goldenshteyn"), DOM.td({}, "Honda FMX 650"), DOM.td({}, "Group 3B"), DOM.td({}, "1/2"), DOM.td({}, "Sommmmm Team")]), DOM.tr({}, [DOM.td({}, DOM.span({ className: 'race-number' }, "42")), DOM.td({}, DOM.img({ height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif' })), DOM.td({}, "Vyacheslav Goldenshteyn"), DOM.td({}, "Honda FMX 650"), DOM.td({}, "Group 3B"), DOM.td({}, "0/1"), DOM.td({}, "Sommmmm Team")]), DOM.tr({ className: 'selected-row' }, [DOM.td({
                    style: {
                        fontSize: '34px',
                        verticalAlign: 'middle'
                    }
                }, DOM.span({ className: 'race-number' }, "42")), DOM.td({ style: { verticalAlign: 'middle' } }, DOM.img({
                    height: '48px',
                    src: 'http://www.geonames.org/flags/x/ua.gif'
                })), DOM.td({ style: { fontSize: '34px', verticalAlign: 'middle' } }, "Vyacheslav Goldenshteyn"), DOM.td({ style: { verticalAlign: 'middle' } }, "Honda FMX 650"), DOM.td({ style: { verticalAlign: 'middle' } }, "Group 3B"), DOM.td({ style: { fontSize: '34px', verticalAlign: 'middle' } }, "0/1"), DOM.td({ style: { verticalAlign: 'middle' } }, "Sommmmm Team")]), DOM.tr({ className: 'selected-row-after' }, [DOM.td({}), DOM.td({ colSpan: '3' }, [React.createElement(ReactBootstrap.Table, { responsive: true, condensed: true }, [DOM.thead({}, DOM.tr({}, [DOM.td({}, ""), DOM.td({}, "Time"), DOM.td({}, "Penalty"), DOM.th({}, "Total"), DOM.td({}, "∆")])), DOM.tbody({}, [DOM.tr({}, [DOM.td({}, "1"), DOM.td({ className: 'col-md-2' }, "1:11.15"), DOM.td({}, [React.createElement(ReactBootstrap.Label, { bsStyle: 'warning' }, "Cone")]), DOM.td({ className: 'col-md-2' }, "1:12.15"), DOM.td({ className: 'col-md-2' }, "0:00.00")]), DOM.tr({}, [DOM.td({}, "2"), DOM.td({ className: 'col-md-2' }, "1:11.16"), DOM.td({}, [React.createElement(ReactBootstrap.Label, { bsStyle: 'warning' }, "Cone")]), DOM.td({ className: 'col-md-2' }, "1:12.16"), DOM.td({ className: 'col-md-2' }, "0:00.01")])])])]), DOM.td({}), DOM.td({}), DOM.td({})]), DOM.tr({}, [DOM.td({}, DOM.span({ className: 'race-number' }, "42")), DOM.td({}, DOM.img({ height: '20px', src: 'http://www.geonames.org/flags/x/ua.gif' })), DOM.td({}, "Vyacheslav Goldenshteyn"), DOM.td({}, "Honda FMX 650"), DOM.td({}, "Group 3B"), DOM.td({}, "0/1"), DOM.td({}, "Sommmmm Team")])])])]);
            }
        }]);

        return CompetitionView;
    })(React.Component);

    return CompetitionView;
});

//# sourceMappingURL=competition.js.map