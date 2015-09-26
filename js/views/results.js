'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment) {
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

                return DOM.table({ style: { width: '100%' } }, DOM.tr({}, [DOM.td({ style: { width: '250px' } }), secondPlace ? React.createElement(SecondPlaceView, { name: secondPlace.name, number: secondPlace.number }) : DOM.td(), firstPlace ? React.createElement(FirstPlaceView, { name: firstPlace.name, number: firstPlace.number }) : DOM.td(), thirdPlace ? React.createElement(ThirdPlaceView, { name: thirdPlace.name, number: thirdPlace.number }) : DOM.td(), DOM.td({ style: { width: '250px' } })]));
            }
        }]);

        return WinnersView;
    })(Shuttle.React.Component);

    var ResultsView = (function (_React$Component) {
        _inherits(ResultsView, _React$Component);

        function ResultsView() {
            _classCallCheck(this, ResultsView);

            _get(Object.getPrototypeOf(ResultsView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(ResultsView, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;
                var eventId = this.props.params.eventId;

                var totalTime = function totalTime(heat) {
                    return R.reduce(function (time, delay) {
                        return time.add(delay);
                    }, moment.duration(heat.result.time), R.map(function (penalty) {
                        return penalty.delay;
                    }, heat.result.penalties));
                };
                var winners = this.props.heats.map(function (heats) {
                    return R.filter(function (heat) {
                        return heat.result.type == 'TimedResult';
                    }, heats);
                }).map(function (heats) {
                    return R.map(function (heat) {
                        return {
                            participant: heat.participant,
                            totalTime: totalTime(heat)
                        };
                    }, heats);
                }).map(function (heats) {
                    return R.sortBy(function (heat) {
                        return -heat.totalTime;
                    }, heats);
                }).map(function (heats) {
                    return R.map(function (heat) {
                        return heat.participant;
                    }, heats);
                });

                return DOM.div({}, [React.createElement(ReactBootstrap.Pager, {}, [React.createElement(ReactBootstrap.PageItem, {
                    previous: true,
                    href: '#event/' + eventId + '/competition'
                }, [React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-left' }), ' ', "Competition"]), React.createElement(ReactBootstrap.PageItem, { href: '#event/' + eventId + '/results' }, "Results")]), React.createElement(WinnersView, {
                    firstPlace: winners.flatMap(function (winners) {
                        return winners.length > 0 ? winners[0] : null;
                    }),
                    secondPlace: winners.flatMap(function (winners) {
                        return winners.length > 1 ? winners[1] : null;
                    }),
                    thirdPlace: winners.flatMap(function (winners) {
                        return winners.length > 2 ? winners[2] : null;
                    })
                })]);
            }
        }]);

        return ResultsView;
    })(React.Component);

    return ResultsView;
});

//# sourceMappingURL=results.js.map