'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'components/editable-table', 'components/text-cell', 'components/date-cell', 'components/select-cell', 'components/country-flag', 'utils/commons'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment, EditableTableView, TextCellView, DateCellView, SelectCellView, CountryFlagView, Commons) {
    var ParticipantHeaderRenderer = (function (_React$Component) {
        _inherits(ParticipantHeaderRenderer, _React$Component);

        function ParticipantHeaderRenderer() {
            _classCallCheck(this, ParticipantHeaderRenderer);

            _get(Object.getPrototypeOf(ParticipantHeaderRenderer.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(ParticipantHeaderRenderer, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;

                return DOM.tr({ key: 'head-row' }, [DOM.td({ key: 'id-header' }, ""), DOM.td({ key: 'number-header' }, "#"), DOM.th({ key: 'country-header' }, "Country"), DOM.th({ key: 'name-header' }, "Name"), DOM.th({ key: 'motorcycle-header' }, "Motorcycle"), DOM.th({ key: 'birthday-header' }, "Birthday")]);
            }
        }]);

        return ParticipantHeaderRenderer;
    })(React.Component);

    var ParticipantFooterRenderer = (function (_React$Component2) {
        _inherits(ParticipantFooterRenderer, _React$Component2);

        function ParticipantFooterRenderer() {
            _classCallCheck(this, ParticipantFooterRenderer);

            _get(Object.getPrototypeOf(ParticipantFooterRenderer.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(ParticipantFooterRenderer, [{
            key: 'render',
            value: function render() {
                return React.DOM.tr({ key: 'foot-row' });
            }
        }]);

        return ParticipantFooterRenderer;
    })(React.Component);

    var ParticipantRenderer = (function (_Shuttle$React$Component) {
        _inherits(ParticipantRenderer, _Shuttle$React$Component);

        function ParticipantRenderer(props) {
            _classCallCheck(this, ParticipantRenderer);

            _get(Object.getPrototypeOf(ParticipantRenderer.prototype), 'constructor', this).call(this, props);
        }

        _createClass(ParticipantRenderer, [{
            key: 'render',
            value: function render() {
                var _this = this;

                var DOM = React.DOM;

                var participant = this.state.item;
                var validationStatus = !R.isEmpty(participant.number) && !R.isEmpty(participant.country) && !R.isEmpty(participant.name) && !R.isEmpty(participant.motorcycle);

                var number = Shuttle.ref(participant.number);
                var country = Shuttle.ref(participant.country);
                var name = Shuttle.ref(participant.name);
                var motorcycle = Shuttle.ref(participant.motorcycle);
                var birthday = Shuttle.ref(participant.birthday);

                Shuttle.combine([number, country, name, motorcycle, birthday], function (number, country, name, motorcycle, birthday) {
                    return {
                        id: participant.id,
                        number: number,
                        country: country,
                        name: name,
                        motorcycle: motorcycle,
                        birthday: birthday
                    };
                }).addListener(function (_, computed) {
                    return _this.props.item.set(computed);
                });

                return DOM.tr({
                    key: 'row',
                    className: this.props.last ? "" : validationStatus ? 'list-group-item-success' : 'list-group-item-danger'
                }, [DOM.td({ key: 'trash', style: { width: '24px' } }, this.props.deleteButton), DOM.td({ key: 'number', style: { width: '50px' } }, React.createElement(TextCellView, {
                    key: 'number-cell',
                    className: 'race-number without-scroll',
                    style: { width: '50px' },
                    maxLength: 3,
                    value: number
                })), DOM.td({ key: 'country', className: 'col-sm-1' }, DOM.div({
                    key: 'country-inner',
                    style: { height: '20px' }
                }, React.createElement(SelectCellView, {
                    key: 'country-cell',
                    value: country,
                    items: this.state.countries,
                    renderer: function renderer(country) {
                        return DOM.div({
                            style: {
                                display: 'inline-block',
                                width: '40px'
                            }
                        }, country ? React.createElement(CountryFlagView, {
                            country: country
                        }) : '');
                    }
                }))), DOM.td({ key: 'name', className: 'col-sm-4' }, React.createElement(TextCellView, {
                    key: 'name-cell',
                    className: 'without-scroll',
                    value: name
                })), DOM.td({
                    key: 'motorcycle',
                    className: 'col-sm-4'
                }, React.createElement(TextCellView, {
                    key: 'motorcycle-cell',
                    className: 'without-scroll',
                    value: motorcycle
                })), DOM.td({
                    key: 'birthday',
                    className: 'col-sm-3'
                }, React.createElement(DateCellView, { key: 'birthday-cell', value: birthday })), DOM.td({ key: 'validation' }, this.props.last ? "" : validationStatus ? React.createElement(ReactBootstrap.Glyphicon, { glyph: 'ok' }) : React.createElement(ReactBootstrap.Glyphicon, { glyph: 'remove' }))]);
            }
        }]);

        return ParticipantRenderer;
    })(Shuttle.React.Component);

    var RegistrationView = (function (_Shuttle$React$Component2) {
        _inherits(RegistrationView, _Shuttle$React$Component2);

        function RegistrationView() {
            _classCallCheck(this, RegistrationView);

            _get(Object.getPrototypeOf(RegistrationView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(RegistrationView, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                var DOM = React.DOM;

                var eventId = this.props.params.eventId;
                var shuffle = function shuffle() {
                    _this2.props.participants.set(R.sortBy(Math.random, _this2.state.participants));
                };

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
                })])]), React.createElement(EditableTableView, {
                    generateNextDefault: function generateNextDefault() {
                        return Shuttle.ref({
                            id: Commons.guid(),
                            number: "",
                            country: null,
                            name: "",
                            motorcycle: "",
                            birthday: moment()
                        });
                    },
                    items: this.props.participants,
                    props: {
                        countries: this.props.countries
                    },
                    getId: function getId(participant) {
                        return participant.id;
                    },
                    isEmpty: function isEmpty(participant) {
                        return R.isEmpty(participant.number) && R.isEmpty(participant.country) && R.isEmpty(participant.name) && R.isEmpty(participant.motorcycle);
                    },
                    headerRenderer: ParticipantHeaderRenderer,
                    footerRenderer: ParticipantFooterRenderer,
                    itemRenderer: ParticipantRenderer
                }), React.createElement(ReactBootstrap.Button, {
                    className: 'pull-right',
                    onClick: function onClick() {
                        return shuffle();
                    }
                }, "Shuffle")]);
            }
        }]);

        return RegistrationView;
    })(Shuttle.React.Component);

    return RegistrationView;
});

//# sourceMappingURL=registration.js.map