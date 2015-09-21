'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-router', 'react-bootstrap', 'ramda', 'moment', 'shuttle', 'shuttle-react', 'components/stopwatch-cell', 'utils/commons'], function (React, ReactRouter, ReactBootstrap, R, moment, Shuttle, ShuttleReact, StopwatchCellView, Commons) {
    var HEATS_COUNT = 2;
    var PENALTY_STYLES = {
        negligible: 'default',
        significant: 'warning',
        critical: 'danger'
    };
    var PENALTIES = [{
        name: 'CM',
        description: 'Course miss',
        delay: moment.duration({ seconds: 0 }),
        type: 'negligible'
    }, {
        name: 'CT',
        description: 'Cone touch',
        delay: moment.duration({ seconds: 1 }),
        type: 'significant'
    }, {
        name: 'GS',
        description: 'Ground stand',
        delay: moment.duration({ seconds: 1 }),
        type: 'significant'
    }, {
        name: 'WF',
        description: 'Wrong finish',
        delay: moment.duration({ seconds: 3 }),
        type: 'significant'
    }, {
        name: 'WC',
        description: 'Wrong course',
        delay: moment.duration({ seconds: 0 }),
        type: 'critical'
    }];

    var HeatView = (function (_React$Component) {
        _inherits(HeatView, _React$Component);

        function HeatView(props) {
            var _this = this;

            _classCallCheck(this, HeatView);

            _get(Object.getPrototypeOf(HeatView.prototype), 'constructor', this).call(this, props);

            this.time = Shuttle.ref(this.props.result.time);
            this.penalties = Shuttle.ref(this.props.result.penalties);

            this.heat = Shuttle.combine([this.time, this.penalties], function (time, penalties) {
                return {
                    id: !R.isNil(_this.props.result.id) ? _this.props.result.id : Commons.guid(),
                    participant: _this.props.result.participant,
                    number: _this.props.rowId + 1,
                    result: {
                        type: 'TimedResult',
                        time: time,
                        penalties: penalties
                    }
                };
            });

            this.listener = function (_, heat) {
                var heats = _this.props.heats.get();

                var index = R.findIndex(function (heat) {
                    return heat.id == _this.props.result.id;
                }, heats);
                if (index >= 0) {
                    heats = R.remove(index, 1, heats);
                }

                _this.props.heats.set(R.append(heat, heats));
            };
        }

        _createClass(HeatView, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.heat.addListener(this.listener);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.heat.removeListener(this.listener);
            }
        }, {
            key: 'render',
            value: function render() {
                return React.DOM.tbody({}, [React.createElement(AdditionalHeatView1, {
                    rowId: this.props.rowId,
                    currentRow: this.props.currentRow,

                    time: this.time,
                    penalties: this.penalties,
                    result: this.props.result
                }), React.createElement(AdditionalHeatView2, {
                    rowId: this.props.rowId,
                    currentRow: this.props.currentRow,

                    time: this.time,
                    penalties: this.penalties,

                    result: this.props.result,

                    heat: this.heat,
                    heats: this.props.heats
                })]);
            }
        }]);

        return HeatView;
    })(React.Component);

    var AdditionalHeatView1 = (function (_Shuttle$React$Component) {
        _inherits(AdditionalHeatView1, _Shuttle$React$Component);

        function AdditionalHeatView1() {
            _classCallCheck(this, AdditionalHeatView1);

            _get(Object.getPrototypeOf(AdditionalHeatView1.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(AdditionalHeatView1, [{
            key: 'render',
            value: function render() {
                return this.state.currentRow == this.props.rowId ? this.renderSelected() : this.renderNonSelected();
            }
        }, {
            key: 'renderSelected',
            value: function renderSelected() {
                var _this2 = this;

                var DOM = React.DOM;

                return DOM.tr({ key: 'selected', className: 'info selected-heat-row' }, [DOM.td({}, this.props.rowId + 1), DOM.td({ className: 'col-md-2' }, this.props.result.time ? this.renderDuration(this.props.result.time) : ''), DOM.td({}, R.addIndex(R.map)(function (penalty, i) {
                    return [React.createElement(ReactBootstrap.Label, {
                        key: i,
                        bsStyle: PENALTY_STYLES[penalty.type],
                        onClick: function onClick() {
                            _this2.props.penalties.set(R.remove(i, 1, _this2.props.result.penalties));
                        }
                    }, [penalty.name, ' ', React.createElement(ReactBootstrap.Glyphicon, {
                        className: 'tag-remove-btn',
                        glyph: 'remove'
                    })]), ' '];
                }, this.props.result.penalties)), DOM.td({ className: 'col-md-2' }, this.renderDuration(this.props.result.totalTime)), DOM.td({ className: 'col-md-2' }, '+' + this.renderDuration(this.props.result.deltaTime))]);
            }
        }, {
            key: 'renderNonSelected',
            value: function renderNonSelected() {
                var _this3 = this;

                var DOM = React.DOM;

                return DOM.tr({
                    key: 'non-selected',
                    onClick: function onClick() {
                        if (R.isNil(_this3.state.currentRow)) {
                            _this3.props.currentRow.set(_this3.props.rowId);
                        }
                    }
                }, [DOM.td({}, this.props.rowId + 1), DOM.td({ className: 'col-md-2' }, this.props.result.time ? this.renderDuration(this.props.result.time) : ''), DOM.td({}, R.addIndex(R.map)(function (penalty, i) {
                    return [React.createElement(ReactBootstrap.Label, {
                        key: i,
                        bsStyle: PENALTY_STYLES[penalty.type]
                    }, penalty.name), ' '];
                }, this.props.result.penalties)), DOM.td({ className: 'col-md-2' }, this.renderDuration(this.props.result.totalTime)), DOM.td({ className: 'col-md-2' }, '+' + this.renderDuration(this.props.result.deltaTime))]);
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

        return AdditionalHeatView1;
    })(Shuttle.React.Component);

    var AdditionalHeatView2 = (function (_Shuttle$React$Component2) {
        _inherits(AdditionalHeatView2, _Shuttle$React$Component2);

        function AdditionalHeatView2() {
            _classCallCheck(this, AdditionalHeatView2);

            _get(Object.getPrototypeOf(AdditionalHeatView2.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(AdditionalHeatView2, [{
            key: 'render',
            value: function render() {
                return this.state.currentRow == this.props.rowId ? this.renderSelected() : this.renderNonSelected();
            }
        }, {
            key: 'renderSelected',
            value: function renderSelected() {
                var _this4 = this;

                var DOM = React.DOM;

                return DOM.tr({ className: 'info selected-heat-row-additional' }, [DOM.td({}, ''), DOM.td({ className: 'col-md-2' }, ''), DOM.td({ colSpan: 2 }, React.createElement(ReactBootstrap.ButtonGroup, {}, R.addIndex(R.map)(function (penalty, i) {
                    return React.createElement(ReactBootstrap.OverlayTrigger, {
                        key: 'overlay-trigger-' + i,
                        placement: 'bottom',
                        delayShow: 1000,
                        overlay: React.createElement(ReactBootstrap.Tooltip, { key: 'overlay-' + i }, penalty.description)
                    }, React.createElement(ReactBootstrap.Button, {
                        key: 'button-' + i,
                        bsSize: 'small',
                        bsStyle: PENALTY_STYLES[penalty.type],
                        onClick: function onClick() {
                            _this4.props.penalties.set(R.append(penalty, _this4.props.result.penalties));
                        }
                    }, penalty.name));
                }, PENALTIES))), DOM.td({}, React.createElement(ReactBootstrap.Button, {
                    bsSize: 'small',
                    onClick: function onClick() {
                        _this4.props.currentRow.set(null);
                    }
                }, React.createElement(ReactBootstrap.Glyphicon, {
                    glyph: 'ok'
                })))]);
            }
        }, {
            key: 'renderNonSelected',
            value: function renderNonSelected() {
                return React.DOM.tr({ key: 'empty' });
            }
        }]);

        return AdditionalHeatView2;
    })(Shuttle.React.Component);

    var ParticipantView = (function (_Shuttle$React$Component3) {
        _inherits(ParticipantView, _Shuttle$React$Component3);

        function ParticipantView(props) {
            _classCallCheck(this, ParticipantView);

            _get(Object.getPrototypeOf(ParticipantView.prototype), 'constructor', this).call(this, props);
        }

        _createClass(ParticipantView, [{
            key: 'render',
            value: function render() {
                var _this5 = this;

                var DOM = React.DOM;
                var participant = this.state.participant;
                var heats = this.state.heats;

                return DOM.tr({
                    key: 'opened-participant-row-1',
                    className: 'non-selected ' + (this.props.opened ? 'selected' : ''),
                    onClick: function onClick() {
                        return _this5.props.onToggle();
                    }
                }, [DOM.td({ className: 'important middle-aligned' }, DOM.span({ className: 'race-number' }, participant.number)), DOM.td({ className: 'middle-aligned' }, DOM.img({
                    className: 'country',
                    src: 'http://www.geonames.org/flags/x/' + participant.country + '.gif'
                })), DOM.td({ className: 'important middle-aligned' }, participant.name), DOM.td({ className: 'middle-aligned' }, participant.motorcycle), DOM.td({ className: 'middle-aligned' }, participant.group), DOM.td({ className: 'important middle-aligned' }, heats.length + '/' + HEATS_COUNT), DOM.td({ className: 'middle-aligned' }, participant.team)]);
            }
        }]);

        return ParticipantView;
    })(Shuttle.React.Component);

    var AdditionalParticipantView = (function (_Shuttle$React$Component4) {
        _inherits(AdditionalParticipantView, _Shuttle$React$Component4);

        function AdditionalParticipantView(props) {
            _classCallCheck(this, AdditionalParticipantView);

            _get(Object.getPrototypeOf(AdditionalParticipantView.prototype), 'constructor', this).call(this, props);

            this.currentRow = Shuttle.ref(this.props.currentRow);
        }

        _createClass(AdditionalParticipantView, [{
            key: 'render',
            value: function render() {
                var _this6 = this;

                var DOM = React.DOM;
                var participant = this.state.participant;
                var currentRow = this.currentRow;
                var results = this.state.results;

                return DOM.tr({ key: 'opened-participant-row-2' }, [DOM.td({ style: { padding: '0' } }, React.createElement('center', { className: 'goto-next' }, this.props.opened ? React.createElement(ReactBootstrap.Glyphicon, { glyph: 'forward' }) : '')), DOM.td({ style: { padding: '0' }, colSpan: 3 }, [DOM.div({ className: 'non-selected-additional ' + (this.props.opened ? 'selected-additional' : '') }, React.createElement(ReactBootstrap.Table, {
                    className: 'inner-table pair-table-striped',
                    responsive: true,
                    condensed: true,
                    hover: true
                }, [DOM.thead({}, DOM.tr({}, [DOM.td({}, ""), DOM.td({}, "Time"), DOM.td({}, "Penalty"), DOM.th({}, "Total"), DOM.td({}, "∆")])), R.addIndex(R.map)(function (result, i) {
                    return React.createElement(HeatView, {
                        key: i,

                        rowId: i,
                        currentRow: currentRow,

                        result: result,
                        heats: _this6.props.heats
                    });
                }, results)]))]), DOM.td({ style: { padding: '0' }, colSpan: 3 })]);
            }
        }]);

        return AdditionalParticipantView;
    })(Shuttle.React.Component);

    var CompetitionView = (function (_Shuttle$React$Component5) {
        _inherits(CompetitionView, _Shuttle$React$Component5);

        function CompetitionView(props) {
            var _this7 = this;

            _classCallCheck(this, CompetitionView);

            _get(Object.getPrototypeOf(CompetitionView.prototype), 'constructor', this).call(this, props);

            this.state.current = R.head(R.filter(function (participant) {
                return R.equals(participant.id, _this7.props.params.participantId);
            }, R.map(function (participant) {
                return participant.get();
            }, this.state.participants)));
        }

        _createClass(CompetitionView, [{
            key: 'render',
            value: function render() {
                var _this8 = this;

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
                    var opened = R.equals(_this8.state.current, participant.get());
                    var heats = _this8.props.heats.map(function (heats) {
                        return R.filter(function (heat) {
                            return R.equals(heat.participant.get(), participant.get());
                        }, heats);
                    });

                    var results = heats.map(function (heats) {
                        return R.map(function (heat) {
                            if (heat.result.type == 'TimedResult') return {
                                id: heat.id,
                                participant: heat.participant,
                                number: heat.number,
                                time: heat.result.time,
                                penalties: heat.result.penalties,
                                totalTime: R.reduce(function (time, delay) {
                                    return time.add(delay);
                                }, moment.duration(heat.result.time), R.map(function (penalty) {
                                    return penalty.delay;
                                }, heat.result.penalties))
                            };

                            if (heat.result.type == 'NoTimeResult') return {
                                id: heat.id,
                                participant: heat.participant,
                                number: heat.number,
                                time: null,
                                penalties: [/*{
                                            name: 'HS',
                                            type: 'negligible',
                                            delay: moment.duration(0)
                                            }*/],
                                totalTime: moment.duration({
                                    minutes: 59,
                                    seconds: 59,
                                    milliseconds: 999
                                })
                            };

                            throw 'undefined';
                        }, R.concat(heats, R.repeat({
                            participant: participant,
                            result: {
                                type: 'NoTimeResult'
                            }
                        }, R.max(HEATS_COUNT - heats.length, 0))));
                    }).map(function (semiResults) {
                        var bestHeatTime = R.reduce(R.min, moment.duration(Infinity), R.map(function (result) {
                            return result.totalTime;
                        }, semiResults));

                        return R.sortBy(function (result) {
                            return result.number;
                        }, R.map(function (result) {
                            return {
                                id: result.id,
                                time: result.time,
                                participant: result.participant,
                                number: result.number,
                                penalties: result.penalties,
                                totalTime: result.totalTime,
                                deltaTime: moment.duration(result.totalTime).subtract(bestHeatTime)
                            };
                        }, semiResults));
                    });

                    return [React.createElement(ParticipantView, {
                        key: 'main-' + i,
                        opened: opened,
                        onToggle: function onToggle() {
                            _this8.setState({ current: !opened ? participant.get() : null });
                        },
                        participant: participant,
                        heats: heats.map(function (heats) {
                            return R.filter(function (heat) {
                                return heat.result.type == 'TimedResult';
                            }, heats);
                        }),
                        eventId: eventId
                    }), React.createElement(AdditionalParticipantView, {
                        key: 'additional-' + i,
                        opened: opened,
                        participant: participant,
                        heats: _this8.props.heats,
                        results: results
                    })];
                }, this.state.participants))])])]);
            }
        }]);

        return CompetitionView;
    })(Shuttle.React.Component);

    return CompetitionView;
});

//# sourceMappingURL=competition.js.map