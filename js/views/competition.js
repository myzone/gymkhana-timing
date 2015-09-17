'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'moment', 'shuttle', 'shuttle-react', 'components/text-cell'], function (React, ReactBootstrap, R, moment, Shuttle, ShuttleReact, TextCellView) {
    var HEATS_COUNT = 2;
    var PENALTY_STYLES = {
        negligible: 'default',
        significant: 'warning',
        critical: 'danger'
    };

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
                var heats = this.props.heats;

                return DOM.tr({
                    key: 'opened-participant-row-1',
                    className: 'non-selected ' + (this.props.opened ? 'selected' : ''),
                    onClick: function onClick() {
                        return _this.props.onToggle();
                    }
                }, [DOM.td({ className: 'important middle-aligned' }, DOM.span({ className: 'race-number' }, participant.number)), DOM.td({ className: 'middle-aligned' }, DOM.img({
                    className: 'country',
                    src: 'http://www.geonames.org/flags/x/' + participant.country + '.gif'
                })), DOM.td({ className: 'important middle-aligned' }, participant.name), DOM.td({ className: 'middle-aligned' }, participant.motorcycle), DOM.td({ className: 'middle-aligned' }, participant.group), DOM.td({ className: 'important middle-aligned' }, heats.length + '/' + HEATS_COUNT), DOM.td({ className: 'middle-aligned' }, participant.team)]);
            }
        }]);

        return ParticipantView;
    })(Shuttle.React.Component);

    var AdditionalParticipantView = (function (_Shuttle$React$Component2) {
        _inherits(AdditionalParticipantView, _Shuttle$React$Component2);

        function AdditionalParticipantView() {
            _classCallCheck(this, AdditionalParticipantView);

            _get(Object.getPrototypeOf(AdditionalParticipantView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(AdditionalParticipantView, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                var DOM = React.DOM;
                var participant = this.state.participant;
                var semiResults = R.map(function (heat) {
                    return {
                        time: heat.time,
                        penalties: heat.penalties,
                        totalTime: R.reduce(function (time, delay) {
                            return time.add(delay);
                        }, moment.duration(heat.time), R.map(function (penalty) {
                            return penalty.delay;
                        }, heat.penalties))
                    };
                }, R.map(function (heat) {
                    return heat.result({
                        onTimedResult: function onTimedResult(time, penalties) {
                            return {
                                time: time,
                                penalties: penalties
                            };
                        },
                        onHaventStared: function onHaventStared() {
                            return {
                                time: moment.duration({
                                    minutes: 59,
                                    seconds: 59,
                                    milliseconds: 999
                                }),
                                penalties: [{
                                    name: 'HS',
                                    type: 'negligible',
                                    delay: moment.duration(0)
                                }]
                            };
                        }
                    });
                }, R.concat(this.props.heats, R.repeat({
                    participant: participant,
                    result: function result(callback) {
                        return callback.onHaventStared();
                    }
                }, HEATS_COUNT - this.props.heats.length))));
                var bestHeatTime = R.min(R.map(function (result) {
                    return result.totalTime;
                }), semiResults);
                var results = R.map(function (result) {
                    return {
                        time: result.time,
                        penalties: result.penalties,
                        totalTime: result.totalTime,
                        deltaTime: moment.duration(result.totalTime).subtract(bestHeatTime)
                    };
                }, semiResults);

                return DOM.tr({ key: 'opened-participant-row-2' }, [DOM.td({ style: { padding: '0' } }), DOM.td({ style: { padding: '0' }, colSpan: 3 }, [DOM.div({ className: 'non-selected-additional ' + (this.props.opened ? 'selected-additional' : '') }, React.createElement(ReactBootstrap.Table, {
                    className: 'inner-table',
                    responsive: true,
                    condensed: true
                }, [DOM.thead({}, DOM.tr({}, [DOM.td({}, ""), DOM.td({}, "Time"), DOM.td({}, "Penalty"), DOM.th({}, "Total"), DOM.td({}, "∆")])), DOM.tbody({}, [R.addIndex(R.map)(function (result, i) {
                    return DOM.tr({ key: i }, [DOM.td({}, i + 1), DOM.td({ className: 'col-md-2' }, _this2.renderDuration(result.time)), DOM.td({}, R.map(function (penalty) {
                        return [React.createElement(ReactBootstrap.Label, { bsStyle: PENALTY_STYLES[penalty.type] }, penalty.name), ' '];
                    }, result.penalties)), DOM.td({ className: 'col-md-2' }, _this2.renderDuration(result.totalTime)), DOM.td({ className: 'col-md-2' }, '+' + _this2.renderDuration(result.deltaTime))]);
                }, results)])]))]), DOM.td({ style: { padding: '0' }, colSpan: 3 })]);
            }
        }, {
            key: 'renderDuration',
            value: function renderDuration(duration) {
                return duration.minutes() + ':' + duration.seconds() + '.' + this.pad(duration.milliseconds(), 3).substr(0, 2);
            }
        }, {
            key: 'pad',
            value: function pad(n, size) {
                var s = R.repeat('0', size - 1).join('') + n;

                return s.substr(s.length - size);
            }
        }]);

        return AdditionalParticipantView;
    })(Shuttle.React.Component);

    var CompetitionView = (function (_Shuttle$React$Component3) {
        _inherits(CompetitionView, _Shuttle$React$Component3);

        function CompetitionView(props) {
            _classCallCheck(this, CompetitionView);

            _get(Object.getPrototypeOf(CompetitionView.prototype), 'constructor', this).call(this, props);

            this.state.current = null;
        }

        _createClass(CompetitionView, [{
            key: 'render',
            value: function render() {
                var _this3 = this;

                var DOM = React.DOM;
                var eventId = this.props.params.eventId;

                return DOM.div({}, [React.createElement(ReactBootstrap.Pager, {}, [React.createElement(ReactBootstrap.PageItem, {
                    previous: true,
                    href: '#event/' + eventId + '/registration'
                }, [React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-left' }), ' ', "Registration"]), React.createElement(ReactBootstrap.PageItem, { href: '#event/' + eventId + '/competition' }, "Competition"), React.createElement(ReactBootstrap.PageItem, { next: true, href: '#event/' + eventId + '/results' }, ["Results", ' ', React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-right' })])]), React.createElement(ReactBootstrap.Table, {
                    key: 'table',
                    className: 'pair-table-striped',
                    responsive: true,
                    hover: true
                }, [DOM.tbody({ key: 'table-body' }, [R.flatten(R.addIndex(R.map)(function (participant, i) {
                    var opened = R.equals(_this3.state.current, participant.get());
                    var heats = R.filter(function (heat) {
                        return R.equals(heat.participant, participant.get());
                    }, _this3.state.heats);

                    return [React.createElement(ParticipantView, {
                        key: 'main-' + i,
                        opened: opened,
                        onToggle: function onToggle() {
                            _this3.setState({ current: !opened ? participant.get() : null });
                        },
                        participant: participant,
                        heats: heats
                    }), React.createElement(AdditionalParticipantView, {
                        key: 'additional-' + i,
                        opened: opened,
                        participant: participant,
                        heats: heats
                    })];
                }, this.state.participants))])])]);
            }
        }]);

        return CompetitionView;
    })(Shuttle.React.Component);

    return CompetitionView;
});

//# sourceMappingURL=competition.js.map