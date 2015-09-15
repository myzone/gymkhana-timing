'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'components/text-cell', 'components/date-cell', 'components/select-cell', 'utils/commons'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, TextCellView, DateCellView, SelectCellView, Commons) {
    var ParticipantView = (function (_Shuttle$React$Component) {
        _inherits(ParticipantView, _Shuttle$React$Component);

        function ParticipantView(props) {
            var _this = this;

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
                return _this.props.participant.set(participant);
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
                this.participant.removeListener(this.listener);

                _get(Object.getPrototypeOf(ParticipantView.prototype), 'componentWillUnmount', this).call(this);
            }
        }, {
            key: 'render',
            value: function render() {
                var DOM = React.DOM;
                var onDelete = this.props.onDelete;
                var validationStatus = this.state.participant.number.length != 0 && this.state.participant.country.length != 0 && this.state.participant.name.length != 0 && this.state.participant.motorcycle.length != 0 && this.state.participant.group.length != 0 && this.state.participant.team.length != 0;

                return DOM.tr({ key: 'row', className: this.props.last ? "" : validationStatus ? 'list-group-item-success' : 'list-group-item-danger' }, [DOM.td({ key: 'trash', style: { width: '24px' } }, React.createElement(ReactBootstrap.Button, {
                    key: 'button',
                    disabled: this.props.last,
                    bsSize: 'xsmall',
                    onClick: onDelete
                }, React.createElement(ReactBootstrap.Glyphicon, { key: 'glyph', glyph: 'trash' }))), DOM.td({ key: 'number', className: 'col-md-1' }, React.createElement(TextCellView, {
                    key: 'number-cell',
                    className: 'race-number',
                    //style: {width: '40px'},
                    value: this.number
                })), DOM.td({ key: 'country', className: 'col-md-1' }, DOM.div({
                    key: 'country-inner',
                    style: { height: '20px' }
                }, React.createElement(SelectCellView, {
                    key: 'country-cell',
                    value: this.country,
                    items: ["ua", "ru", "by", "pl", "md", "ro"],
                    renderer: function renderer(item) {
                        return DOM.img({
                            key: 'image',
                            width: '32px',
                            src: 'http://www.geonames.org/flags/x/' + item + '.gif'
                        });
                    }
                }))), DOM.td({ key: 'name', className: 'col-md-4' }, React.createElement(TextCellView, {
                    key: 'name-cell',
                    value: this.name
                })), DOM.td({
                    key: 'motorcycle',
                    className: 'col-md-1'
                }, React.createElement(TextCellView, { key: 'motorcycle-cell', value: this.motorcycle })), DOM.td({ key: 'group', className: 'col-md-1' }, React.createElement(TextCellView, {
                    key: 'group-cell',
                    value: this.group
                })), DOM.td({
                    key: 'birthday',
                    className: 'col-md-1'
                }, React.createElement(DateCellView, { key: 'birthday-cell', value: this.birthday })), DOM.td({ key: 'team', className: 'col-md-2' }, React.createElement(TextCellView, {
                    key: 'team-cell',
                    value: this.team
                })), DOM.td({ key: 'validation', className: 'col-md-1' }, this.props.last ? "" : validationStatus ? React.createElement(ReactBootstrap.Glyphicon, { glyph: 'ok' }) : React.createElement(ReactBootstrap.Glyphicon, { glyph: 'remove' }))]);
            }
        }]);

        return ParticipantView;
    })(Shuttle.React.Component);

    var RegistrationView = (function (_Shuttle$React$Component2) {
        _inherits(RegistrationView, _Shuttle$React$Component2);

        function RegistrationView(props) {
            var _this2 = this;

            _classCallCheck(this, RegistrationView);

            _get(Object.getPrototypeOf(RegistrationView.prototype), 'constructor', this).call(this, props);

            var generateLast = function generateLast() {
                _this2.last = Shuttle.ref({
                    id: Commons.guid(),
                    number: "",
                    country: "ua",
                    name: "",
                    motorcycle: "",
                    group: "",
                    birthday: "2015-09-01",
                    team: ""
                });
                _this2.last.addListener(_this2.listener);
            };

            this.listener = function (_, participant) {
                if (participant.number.length != 0 || participant.country.length != 0 || participant.name.length != 0 || participant.motorcycle.length != 0 || participant.group.length != 0 || participant.team.length != 0) {

                    var last = _this2.last;
                    generateLast();

                    last.removeListener(_this2.listener);
                    _this2.props.participants.set(R.append(last, _this2.state.participants));
                }
            };

            generateLast();
        }

        _createClass(RegistrationView, [{
            key: 'render',
            value: function render() {
                var _this3 = this;

                var DOM = React.DOM;

                var eventId = this.props.params.eventId;

                return DOM.div({ key: 'registration-root' }, [React.createElement(ReactBootstrap.Pager, { key: 'pager-root' }, [React.createElement(ReactBootstrap.PageItem, {
                    key: 'previous',
                    previous: true,
                    href: '#event/' + eventId + '/configuration'
                }, [React.createElement(ReactBootstrap.Glyphicon, {
                    key: 'glyph',
                    glyph: 'menu-left'
                }), ' ', "Configuration"]), React.createElement(ReactBootstrap.PageItem, {
                    key: 'current',
                    href: '#event/' + eventId + '/registration'
                }, "Registration"), React.createElement(ReactBootstrap.PageItem, {
                    key: 'next',
                    next: true,
                    href: '#event/' + eventId + '/competition'
                }, ["Competition", ' ', React.createElement(ReactBootstrap.Glyphicon, {
                    key: 'glyph',
                    glyph: 'menu-right'
                })])]), React.createElement(ReactBootstrap.Table, {
                    key: 'table',
                    className: 'data-editable',
                    responsive: true,
                    hover: true,
                    striped: true
                }, [DOM.thead({ key: 'table-head' }, DOM.tr({ key: 'head-row' }, [DOM.td({ key: 'id-header' }, ""), DOM.td({ key: 'number-header' }, "#"), DOM.th({ key: 'country-header' }, "Country"), DOM.th({ key: 'name-header' }, "Name"), DOM.th({ key: 'motorcycle-header' }, "Motorcycle"), DOM.th({ key: 'group-header' }, "Group"), DOM.th({ key: 'birthday-header' }, "Birthday"), DOM.th({ key: 'team-header' }, "Team")])), DOM.tbody({ key: 'table-body' }, [R.append(React.createElement(ParticipantView, {
                    key: this.last.get().id,
                    participant: this.last,
                    last: true,
                    onDelete: function onDelete() {}
                }), R.map(function (participant) {
                    return React.createElement(ParticipantView, {
                        key: participant.get().id,
                        participant: participant,
                        onDelete: function onDelete() {
                            _this3.props.participants.set(R.filter(function (p) {
                                return p.get().id !== participant.get().id;
                            }, _this3.state.participants));
                        }
                    });
                }, this.state.participants))])])]);
            }
        }]);

        return RegistrationView;
    })(Shuttle.React.Component);

    return RegistrationView;
});

//# sourceMappingURL=registration.js.map