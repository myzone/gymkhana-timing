////������ ��������� ���� ������� �������
//������� �����\����� ��������� ������
//������� �������������� ������� �� �����
//������� ���������
//��������� ������� � ���., ...
//��������� �������+������ � �������������
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'react-router', 'ramda', 'shuttle', 'shuttle-react'], function (React, ReactBootstrap, ReactRouter, R, Shuttle, ShuttleReact) {
    var ParticipantView = (function (_Shuttle$React$Component) {
        _inherits(ParticipantView, _Shuttle$React$Component);

        function ParticipantView(props) {
            _classCallCheck(this, ParticipantView);

            _get(Object.getPrototypeOf(ParticipantView.prototype), 'constructor', this).call(this, props);
        }

        _createClass(ParticipantView, [{
            key: 'render',
            value: function render() {
                var _this = this;

                var DOM = React.DOM;
                var participant = this.state.participant;
                var onDelete = this.props.onDelete;

                return DOM.tr({}, [DOM.td({ style: { width: '24px' } }, React.createElement(ReactBootstrap.Button, {
                    disabled: participant.name.get() == "",
                    bsSize: 'xsmall',
                    onClick: onDelete
                }, React.createElement(ReactBootstrap.Glyphicon, { glyph: 'trash' }))), DOM.td({}, DOM.span({ className: 'race-number' }, participant.number)), DOM.td({}, DOM.img({
                    height: '20px',
                    src: 'http://www.geonames.org/flags/x/' + participant.country + '.gif'
                })), DOM.td({}, DOM.textarea({
                    onChange: function onChange(event) {
                        _this.props.participant.flatMap(function (participant) {
                            return participant.name;
                        }).set(event.target.value);
                    },
                    value: participant.name.get()
                })), DOM.td({}, DOM.textarea({}, participant.motorcycle)), DOM.td({}, DOM.textarea({}, participant.group)), DOM.td({}, participant.birthday), DOM.td({}, DOM.textarea({}, participant.team))]);
            }
        }]);

        return ParticipantView;
    })(Shuttle.React.Component);

    var RegistrationView = (function (_Shuttle$React$Component2) {
        _inherits(RegistrationView, _Shuttle$React$Component2);

        function RegistrationView(props) {
            _classCallCheck(this, RegistrationView);

            _get(Object.getPrototypeOf(RegistrationView.prototype), 'constructor', this).call(this, props);
        }

        _createClass(RegistrationView, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                var DOM = React.DOM;

                var eventId = this.props.params.eventId;

                return DOM.div({}, [React.createElement(ReactBootstrap.Pager, {}, [React.createElement(ReactBootstrap.PageItem, {
                    previous: true,
                    href: '#event/' + eventId + '/configuration'
                }, [React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-left' }), ' ', "Configuration"]), React.createElement(ReactBootstrap.PageItem, { href: '#event/' + eventId + '/registration' }, "Registration"), React.createElement(ReactBootstrap.PageItem, { next: true, href: '#event/' + eventId + '/competition' }, ["Competition", ' ', React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-right' })])]), React.createElement(ReactBootstrap.Table, {
                    className: 'dataEditable',
                    responsive: true,
                    hover: true,
                    striped: true
                }, [DOM.thead({}, DOM.tr({}, [DOM.td({}, ""), DOM.td({}, "#"), DOM.th({}, "Country"), DOM.th({}, "Name"), DOM.th({}, "Motorcycle"), DOM.th({}, "Group"), DOM.th({}, "Birthday"), DOM.th({}, "Team")])), DOM.tbody({}, [R.map(function (participant) {
                    return React.createElement(ParticipantView, {
                        participant: participant,
                        onDelete: function onDelete() {
                            _this2.props.application.set({ participants: R.filter(function (p) {
                                    return p === participant;
                                }, _this2.state.application.participants) });
                        }
                    });
                }, this.state.application.participants), DOM.tr({}, [DOM.td({ style: { width: '24px' } }, React.createElement(ReactBootstrap.Button, {
                    disabled: true,
                    bsSize: 'xsmall'
                }, React.createElement(ReactBootstrap.Glyphicon, { glyph: 'trash' }))), DOM.td({}, ""), DOM.td({}, ""), DOM.td({}, ""), DOM.td({}, ""), DOM.td({}, ""), DOM.td({}, ""), DOM.td({}, "")])])])]);
            }
        }]);

        return RegistrationView;
    })(Shuttle.React.Component);

    return RegistrationView;
});

//# sourceMappingURL=registration.js.map