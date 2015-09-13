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

define(['react', 'react-bootstrap', 'react-router', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], function (React, ReactBootstrap, ReactRouter, R, Shuttle, ShuttleReact, Commons) {
    var Cell = (function (_Shuttle$React$Component) {
        _inherits(Cell, _Shuttle$React$Component);

        function Cell(props) {
            _classCallCheck(this, Cell);

            _get(Object.getPrototypeOf(Cell.prototype), 'constructor', this).call(this, props);
        }

        _createClass(Cell, [{
            key: 'render',
            value: function render() {
                var _this = this;

                return React.DOM.textarea({
                    defaultValue: this.state.value,
                    onChange: function onChange(event) {
                        _this.props.value.set(event.target.value);
                    }
                });
            }
        }]);

        return Cell;
    })(Shuttle.React.Component);

    var ParticipantView = (function (_Shuttle$React$Component2) {
        _inherits(ParticipantView, _Shuttle$React$Component2);

        function ParticipantView(props) {
            var _this2 = this;

            _classCallCheck(this, ParticipantView);

            _get(Object.getPrototypeOf(ParticipantView.prototype), 'constructor', this).call(this, props);

            var participant = this.state.participant;

            this.number = Shuttle.ref(participant.number);
            this.country = Shuttle.ref(participant.country);
            this.name = Shuttle.ref(participant.name);
            this.motorcycle = Shuttle.ref(participant.motorcycle);
            this.group = Shuttle.ref(participant.group);
            this.birthday = Shuttle.ref(participant.birthday);
            this.team = Shuttle.ref(participant.team);

            this.listener = function (_, participant) {
                return _this2.props.participant.set(participant);
            };
            this.participant = Shuttle.combine([this.number, this.country, this.name, this.motorcycle, this.group, this.birthday, this.team], function (number, country, name, motorcycle, group, birthday, team) {
                return {
                    id: participant.id,
                    number: number,
                    country: country,
                    name: name,
                    motorcycle: motorcycle,
                    group: group,
                    birthday: birthday,
                    team: team
                };
            });
        }

        _createClass(ParticipantView, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                _get(Object.getPrototypeOf(ParticipantView.prototype), 'componentDidMount', this).call(this);

                this.participant.addListener(this.listener);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                _get(Object.getPrototypeOf(ParticipantView.prototype), 'componentWillUnmount', this).call(this);

                this.participant.removeListener(this.listener);
            }
        }, {
            key: 'render',
            value: function render() {
                var DOM = React.DOM;
                var participant = this.state.participant;
                var onDelete = this.props.onDelete;

                return DOM.tr({}, [DOM.td({ style: { width: '24px' } }, React.createElement(ReactBootstrap.Button, {
                    disabled: this.props.last,
                    bsSize: 'xsmall',
                    onClick: onDelete
                }, React.createElement(ReactBootstrap.Glyphicon, { glyph: 'trash' }))), DOM.td({}, DOM.span({ className: 'race-number' }, participant.number)), DOM.td({}, DOM.img({
                    height: '20px',
                    src: 'http://www.geonames.org/flags/x/' + participant.country + '.gif'
                })), DOM.td({}, React.createElement(Cell, { value: this.name })), DOM.td({}, DOM.textarea({ defaultValue: participant.motorcycle })), DOM.td({}, DOM.textarea({ defaultValue: participant.group })), DOM.td({}, participant.birthday), DOM.td({}, DOM.textarea({ defaultValue: participant.team }))]);
            }
        }]);

        return ParticipantView;
    })(Shuttle.React.Component);

    var RegistrationView = (function (_Shuttle$React$Component3) {
        _inherits(RegistrationView, _Shuttle$React$Component3);

        function RegistrationView(props) {
            var _this3 = this;

            _classCallCheck(this, RegistrationView);

            _get(Object.getPrototypeOf(RegistrationView.prototype), 'constructor', this).call(this, props);

            this.listener = function (_, participant) {
                if (participant.number.length != 0 || participant.country.length != 0 || participant.name.length != 0 || participant.motorcycle.length != 0 || participant.group.length != 0 || participant.team.length != 0) {

                    var last = _this3.last;

                    _this3.last = Shuttle.ref({ id: Commons.guid(), number: "", country: "", name: "", motorcycle: "", group: "", birthday: "", team: "" });
                    _this3.last.addListener(_this3.listener);

                    last.removeListener(_this3.listener);
                    _this3.props.participants.set(R.append(last, _this3.state.participants));
                }
            };

            this.last = Shuttle.ref({ id: Commons.guid(), number: "", country: "", name: "", motorcycle: "", group: "", birthday: "", team: "" });
            this.last.addListener(this.listener);
        }

        _createClass(RegistrationView, [{
            key: 'render',
            value: function render() {
                var _this4 = this;

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
                }, [DOM.thead({}, DOM.tr({}, [DOM.td({}, ""), DOM.td({}, "#"), DOM.th({}, "Country"), DOM.th({}, "Name"), DOM.th({}, "Motorcycle"), DOM.th({}, "Group"), DOM.th({}, "Birthday"), DOM.th({}, "Team")])), DOM.tbody({}, [R.map(function (participant, i) {
                    return React.createElement(ParticipantView, {
                        key: participant.get().id,
                        participant: participant,
                        onDelete: function onDelete() {
                            _this4.props.participants.set(R.filter(function (p) {
                                return p.get().id !== participant.get().id;
                            }, _this4.state.participants));
                        }
                    });
                }, this.state.participants), React.createElement(ParticipantView, {
                    key: this.last.get().id,
                    participant: this.last,
                    last: true,
                    onDelete: function onDelete() {}
                })])])]);
            }
        }]);

        return RegistrationView;
    })(Shuttle.React.Component);

    return RegistrationView;
});

//# sourceMappingURL=registration.js.map