'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(['react', 'react-router', 'react-bootstrap', 'ramda', 'moment', 'moment-durations', 'shuttle', 'shuttle-react', 'components/stopwatch-cell', 'components/country-flag', 'utils/commons'], function (React, ReactRouter, ReactBootstrap, R, moment, momentDurations, Shuttle, ShuttleReact, StopwatchCellView, CountryFlagView, Commons) {
    var PENALTY_STYLES = {
        negligible: 'default',
        significant: 'warning',
        critical: 'danger'
    };
    var HEATS_COUNT = 2;

    var renderDuration = function renderDuration(duration) {
        return duration.format("mm:ss.SSS", { trim: false });
    };

    var FirstPlaceView = (function () {
        function FirstPlaceView() {
            _classCallCheck(this, FirstPlaceView);
        }

        _createClass(FirstPlaceView, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;

                return DOM.td({ className: 'col-md-3' }, [React.createElement('center', {}, DOM.div({ style: { marginTop: '0px' } }, [DOM.span({ className: 'race-number' }, this.props.number), ' ', DOM.span({}, this.props.name)])), DOM.div({
                    style: {
                        background: 'gold',
                        height: '80px',
                        marginLeft: '5px',
                        marginRight: '5px',
                        fontSize: '58px'
                    }
                }, React.createElement('center', {}, DOM.span({
                    className: 'podium-label',
                    style: {
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }
                }, "1")))]);
            }
        }]);

        return FirstPlaceView;
    })();

    var SecondPlaceView = (function () {
        function SecondPlaceView() {
            _classCallCheck(this, SecondPlaceView);
        }

        _createClass(SecondPlaceView, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;

                return DOM.td({ className: 'col-md-3' }, [React.createElement('center', {}, DOM.div({ style: { marginTop: '20px' } }, [DOM.span({ className: 'race-number' }, this.props.number), ' ', DOM.span({}, this.props.name)])), DOM.div({
                    style: {
                        background: 'silver',
                        height: '60px',
                        marginLeft: '5px',
                        marginRight: '5px',
                        fontSize: '43px'
                    }
                }, React.createElement('center', {}, DOM.span({
                    className: 'podium-label',
                    style: {
                        paddingLeft: '13px',
                        paddingRight: '13px'
                    }
                }, "2")))]);
            }
        }]);

        return SecondPlaceView;
    })();

    var ThirdPlaceView = (function () {
        function ThirdPlaceView() {
            _classCallCheck(this, ThirdPlaceView);
        }

        _createClass(ThirdPlaceView, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;

                return DOM.td({ className: 'col-md-3' }, [React.createElement('center', {}, DOM.div({ style: { marginTop: '40px' } }, [DOM.span({ className: 'race-number' }, this.props.number), ' ', DOM.span({}, this.props.name)])), DOM.div({
                    style: {
                        height: '40px',
                        background: '#CD7F32',
                        marginLeft: '5px',
                        marginRight: '5px',
                        fontSize: '30px'
                    }
                }, React.createElement('center', {}, DOM.span({
                    className: 'podium-label',
                    style: {
                        paddingLeft: '9px',
                        paddingRight: '9px'
                    }
                }, "3")))]);
            }
        }]);

        return ThirdPlaceView;
    })();

    var WinnersView = (function (_Shuttle$React$Component) {
        _inherits(WinnersView, _Shuttle$React$Component);

        function WinnersView() {
            _classCallCheck(this, WinnersView);

            _get(Object.getPrototypeOf(WinnersView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(WinnersView, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;

                var firstPlace = this.state.firstPlace;
                var secondPlace = this.state.secondPlace;
                var thirdPlace = this.state.thirdPlace;

                return DOM.table({ style: { width: '100%' } }, DOM.tr({}, [DOM.td({ style: { width: '250px' } }), secondPlace ? React.createElement(SecondPlaceView, {
                    name: secondPlace.name,
                    number: secondPlace.number
                }) : DOM.td(), firstPlace ? React.createElement(FirstPlaceView, {
                    name: firstPlace.name,
                    number: firstPlace.number
                }) : DOM.td(), thirdPlace ? React.createElement(ThirdPlaceView, {
                    name: thirdPlace.name,
                    number: thirdPlace.number
                }) : DOM.td(), DOM.td({ style: { width: '250px' } })]));
            }
        }]);

        return WinnersView;
    })(Shuttle.React.Component);

    var PenaltyView = (function (_Shuttle$React$Component2) {
        _inherits(PenaltyView, _Shuttle$React$Component2);

        function PenaltyView() {
            _classCallCheck(this, PenaltyView);

            _get(Object.getPrototypeOf(PenaltyView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(PenaltyView, [{
            key: 'render',
            value: function render() {
                var penalty = this.state.penalty;
                var i = this.props.i;

                return React.createElement(ReactBootstrap.Label, {
                    key: i,
                    bsStyle: PENALTY_STYLES[penalty.type]
                }, penalty.name);
            }
        }]);

        return PenaltyView;
    })(Shuttle.React.Component);

    var ParticipantView = (function (_Shuttle$React$Component3) {
        _inherits(ParticipantView, _Shuttle$React$Component3);

        function ParticipantView() {
            _classCallCheck(this, ParticipantView);

            _get(Object.getPrototypeOf(ParticipantView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(ParticipantView, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;
                var participant = this.state.participant;

                return DOM.tr({}, [DOM.td({ className: 'middle-aligned' }, DOM.span({ className: 'race-number' }, participant.number)), DOM.td({ className: 'middle-aligned' }, participant.country ? React.createElement(CountryFlagView, { country: participant.country }) : ''), DOM.td({ className: 'middle-aligned' }, participant.name), DOM.td({ className: 'middle-aligned' }, participant.motorcycle), DOM.td({ className: 'middle-aligned' }, participant.group), DOM.td({ className: 'middle-aligned' }, participant.team)]);
            }
        }]);

        return ParticipantView;
    })(Shuttle.React.Component);

    var HeatsView = (function (_React$Component) {
        _inherits(HeatsView, _React$Component);

        function HeatsView() {
            _classCallCheck(this, HeatsView);

            _get(Object.getPrototypeOf(HeatsView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(HeatsView, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;
                var heats = this.props.heats;
                var penaltyTypes = this.props.penaltyTypes;

                return DOM.tr({}, [DOM.td({ style: { padding: '0' } }), DOM.td({ style: { padding: '0' }, colSpan: 3 }, [DOM.div({}, React.createElement(ReactBootstrap.Table, {
                    className: 'inner-table',
                    responsive: true,
                    striped: true,
                    condensed: true
                }, [DOM.thead({}, DOM.tr({}, [DOM.td({}, ""), DOM.td({}, "Time"), DOM.td({}, "Penalty"), DOM.th({}, "Total"), DOM.td({}, "∆")])), DOM.tbody({}, R.addIndex(R.map)(function (heat, i) {
                    return DOM.tr({ key: i }, [DOM.td({}, heat.number), DOM.td({ className: 'col-md-2' }, heat.time ? renderDuration(heat.time) : ''), DOM.td({}, R.addIndex(R.map)(function (penalty, i) {
                        return [React.createElement(PenaltyView, {
                            i: i,
                            penalty: penaltyTypes[penalty]
                        }), ' '];
                    }, heat.penalties)), DOM.td({ className: 'col-md-2' }, renderDuration(heat.totalTime)), DOM.td({ className: 'col-md-2' }, '+' + renderDuration(heat.deltaTime))]);
                }, R.sortBy(function (heat) {
                    return heat.number;
                }, heats)))]))]), DOM.td({ style: { padding: '0' }, colSpan: 3 })]);
            }
        }]);

        return HeatsView;
    })(React.Component);

    var ResultTableView = (function (_Shuttle$React$Component4) {
        _inherits(ResultTableView, _Shuttle$React$Component4);

        function ResultTableView() {
            _classCallCheck(this, ResultTableView);

            _get(Object.getPrototypeOf(ResultTableView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(ResultTableView, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;
                var results = this.state.results;
                var penaltyTypes = this.props.penaltyTypes;

                return React.createElement(ReactBootstrap.Panel, {}, React.createElement(ReactBootstrap.Table, {
                    key: 'table',
                    className: 'group-table-striped group-table-hover data-editable',
                    responsive: true,
                    fill: true
                }, [R.addIndex(R.map)(function (result, i) {
                    return DOM.tbody({ key: i }, [React.createElement(ParticipantView, { participant: result.participant, heats: result.heats }), React.createElement(HeatsView, { heats: result.heats, bestTime: result.bestTime, penaltyTypes: penaltyTypes })]);
                }, results)]));
            }
        }]);

        return ResultTableView;
    })(Shuttle.React.Component);

    var ResultsView = (function (_Shuttle$React$Component5) {
        _inherits(ResultsView, _Shuttle$React$Component5);

        function ResultsView() {
            _classCallCheck(this, ResultsView);

            _get(Object.getPrototypeOf(ResultsView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(ResultsView, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;
                var eventId = this.props.params.eventId;
                var penaltyTypes = this.state.penaltyTypes;

                var totalTime = function totalTime(heat) {
                    return R.reduce(function (time, delay) {
                        return time.add(delay);
                    }, moment.duration(heat.result.time), R.map(function (penalty) {
                        return penaltyTypes[penalty].delay;
                    }, heat.result.penalties));
                };
                var semiResults = this.props.heats.map(R.compose(R.sortBy(function (heat) {
                    return heat.bestTime;
                }), R.values, R.mapObjIndexed(function (heats, participant) {
                    return R.identity({
                        participant: participant,
                        bestTime: R.reduce(R.min, Infinity, R.map(function (heat) {
                            return heat.totalTime;
                        }, heats)),
                        heats: heats
                    });
                }), R.groupBy(function (heat) {
                    return heat.participant;
                }), R.map(function (heat) {
                    return R.identity({
                        participant: heat.participant,
                        number: heat.number,
                        time: heat.result.time,
                        penalties: heat.result.penalties,
                        totalTime: totalTime(heat)
                    });
                }), R.filter(function (heat) {
                    return heat.result.type == 'TimedResult';
                })));
                var results = Shuttle.combine([semiResults, this.props.participants], function (results, participants) {
                    return R.map(function (result) {
                        return R.identity({
                            participant: R.find(function (participant) {
                                return R.equals(result.participant, participant.get().id);
                            }, participants),
                            bestTime: result.bestTime,
                            heats: R.map(function (heat) {
                                return R.identity({
                                    participant: heat.participant,
                                    number: heat.number,
                                    time: heat.time,
                                    penalties: heat.penalties,
                                    totalTime: heat.totalTime,
                                    deltaTime: moment.duration(heat.totalTime).subtract(result.bestTime)
                                });
                            }, result.heats)
                        });
                    }, results);
                });
                var winners = results.map(R.map(function (result) {
                    return result.participant;
                }));

                return DOM.div({}, [React.createElement(ReactBootstrap.Pager, {}, [React.createElement(ReactBootstrap.PageItem, {
                    previous: true,
                    href: '#event/' + eventId + '/competition'
                }, [React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-left' }), ' ', "Competition"]), React.createElement(ReactBootstrap.PageItem, { href: '#event/' + eventId + '/results' }, "Results")]), React.createElement(WinnersView, {
                    firstPlace: winners.flatMap(function (winners) {
                        return winners.length > 0 ? winners[0] : Shuttle.ref(null);
                    }),
                    secondPlace: winners.flatMap(function (winners) {
                        return winners.length > 1 ? winners[1] : Shuttle.ref(null);
                    }),
                    thirdPlace: winners.flatMap(function (winners) {
                        return winners.length > 2 ? winners[2] : Shuttle.ref(null);
                    })
                }), React.createElement(ResultTableView, { results: results, penaltyTypes: penaltyTypes })]);
            }
        }]);

        return ResultsView;
    })(Shuttle.React.Component);

    return ResultsView;
});

//# sourceMappingURL=results.js.map