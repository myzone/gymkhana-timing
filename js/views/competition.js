'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-router', 'react-bootstrap', 'ramda', 'moment', 'moment-durations', 'shuttle', 'shuttle-react', 'components/stopwatch-cell', 'components/country-flag', 'utils/commons'], function (React, ReactRouter, ReactBootstrap, R, moment, momentDurations, Shuttle, ShuttleReact, StopwatchCellView, CountryFlagView, Commons) {
    var PENALTY_STYLES = {
        negligible: 'default',
        significant: 'warning',
        critical: 'danger'
    };

    var renderDuration = function renderDuration(duration) {
        return duration.format("mm:ss.SSS", { trim: false });
    };

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
                    number: _this.props.result.number,
                    result: !R.isNil(time) || !R.isEmpty(penalties) ? { type: 'TimedResult', time: time, penalties: penalties } : { type: 'NoTimeResult' }
                };
            });

            this.listener = function (_, heat) {
                var heats = _this.props.heats.get();

                var index = R.findIndex(function (heat) {
                    return heat.id == _this.props.result.id;
                }, heats);
                if (index > -1) {
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
                    penaltyTypes: this.props.penaltyTypes,

                    result: this.props.result
                }), React.createElement(AdditionalHeatView2, {
                    rowId: this.props.rowId,
                    currentRow: this.props.currentRow,

                    time: this.time,
                    penalties: this.penalties,
                    penaltyTypes: this.props.penaltyTypes,

                    result: this.props.result,

                    heat: this.heat,
                    heats: this.props.heats
                })]);
            }
        }]);

        return HeatView;
    })(React.Component);

    var PenaltyView = (function (_Shuttle$React$Component) {
        _inherits(PenaltyView, _Shuttle$React$Component);

        function PenaltyView() {
            _classCallCheck(this, PenaltyView);

            _get(Object.getPrototypeOf(PenaltyView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(PenaltyView, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                var penalty = this.state.penalty;
                var selected = this.props.selected;

                var onClick = function onClick() {
                    if (selected) {
                        var index = R.findIndex(function (penaltyId) {
                            return penalty.id;
                        }, _this2.state.penalties);

                        if (index > -1) {
                            _this2.props.penalties.set(R.remove(index, 1, _this2.state.penalties));
                        }
                    }
                };

                return React.createElement(ReactBootstrap.Label, {
                    bsStyle: PENALTY_STYLES[penalty.type],
                    onClick: onClick
                }, selected ? [penalty.name, ' ', React.createElement(ReactBootstrap.Glyphicon, {
                    className: 'tag-remove-btn',
                    glyph: 'remove'
                })] : penalty.name);
            }
        }]);

        return PenaltyView;
    })(Shuttle.React.Component);

    var AddPenaltyButton = (function (_Shuttle$React$Component2) {
        _inherits(AddPenaltyButton, _Shuttle$React$Component2);

        function AddPenaltyButton() {
            _classCallCheck(this, AddPenaltyButton);

            _get(Object.getPrototypeOf(AddPenaltyButton.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(AddPenaltyButton, [{
            key: 'render',
            value: function render() {
                var _this3 = this;

                var penalty = this.state.penalty;

                return React.createElement(ReactBootstrap.OverlayTrigger, {
                    placement: 'bottom',
                    delayShow: 1000,
                    overlay: React.createElement(ReactBootstrap.Tooltip, {}, penalty.description)
                }, React.createElement(ReactBootstrap.Button, {
                    bsSize: 'small',
                    bsStyle: PENALTY_STYLES[penalty.type],
                    onClick: function onClick() {
                        _this3.props.penalties.set(R.append(penalty.id, _this3.state.penalties));
                    }
                }, penalty.name));
            }
        }]);

        return AddPenaltyButton;
    })(Shuttle.React.Component);

    var AdditionalHeatView1 = (function (_Shuttle$React$Component3) {
        _inherits(AdditionalHeatView1, _Shuttle$React$Component3);

        function AdditionalHeatView1() {
            _classCallCheck(this, AdditionalHeatView1);

            _get(Object.getPrototypeOf(AdditionalHeatView1.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(AdditionalHeatView1, [{
            key: 'render',
            value: function render() {
                var _this4 = this;

                var DOM = React.DOM;
                var selected = this.state.currentRow == this.props.rowId;
                var penaltyTypes = this.state.penaltyTypes;
                var penalties = R.filter(function (penalty) {
                    return R.has(penalty, penaltyTypes);
                }, this.state.penalties);
                var onSelect = function onSelect() {
                    if (R.isNil(_this4.state.currentRow)) {
                        _this4.props.currentRow.set(_this4.props.rowId);
                    }
                };

                return DOM.tr({
                    className: selected ? 'info selected-heat-row' : '',
                    onClick: onSelect
                }, [DOM.td({}, this.props.rowId + 1), DOM.td({ className: 'col-sm-2' }, selected ? React.createElement(StopwatchCellView, { value: this.props.time }) : this.props.result.time ? renderDuration(this.props.result.time) : ''), DOM.td({ className: 'col-sm-9' }, R.addIndex(R.map)(function (penalty, i) {
                    return [React.createElement(PenaltyView, {
                        key: i,
                        penalty: penaltyTypes[penalty],
                        penalties: _this4.props.penalties,
                        selected: selected
                    }), ' '];
                }, penalties)), DOM.td({ className: 'col-sm-2' }, renderDuration(this.props.result.totalTime)), DOM.td({ className: 'col-sm-2' }, '+' + renderDuration(this.props.result.deltaTime))]);
            }
        }]);

        return AdditionalHeatView1;
    })(Shuttle.React.Component);

    var AdditionalHeatView2 = (function (_Shuttle$React$Component4) {
        _inherits(AdditionalHeatView2, _Shuttle$React$Component4);

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
                var _this5 = this;

                var DOM = React.DOM;

                return DOM.tr({ className: 'info selected-heat-row-additional' }, [DOM.td({}, ''), DOM.td({ className: 'col-sm-2' }, ''), DOM.td({ className: 'col-sm-10' }, React.createElement(ReactBootstrap.ButtonGroup, {}, R.addIndex(R.map)(function (penalty, i) {
                    return React.createElement(AddPenaltyButton, {
                        penalty: penalty,
                        penalties: _this5.props.penalties
                    });
                }, R.values(this.state.penaltyTypes)))), DOM.td({ className: 'col-sm-2' }, React.createElement(ReactBootstrap.Button, {
                    bsSize: 'small',
                    onClick: function onClick() {
                        _this5.props.currentRow.set(null);
                    }
                }, React.createElement(ReactBootstrap.Glyphicon, {
                    glyph: 'ok'
                }))), DOM.td({ className: 'col-sm-2' }, '')]);
            }
        }, {
            key: 'renderNonSelected',
            value: function renderNonSelected() {
                return React.DOM.tr({ key: 'empty' });
            }
        }]);

        return AdditionalHeatView2;
    })(Shuttle.React.Component);

    var ParticipantView = (function (_Shuttle$React$Component5) {
        _inherits(ParticipantView, _Shuttle$React$Component5);

        function ParticipantView(props) {
            _classCallCheck(this, ParticipantView);

            _get(Object.getPrototypeOf(ParticipantView.prototype), 'constructor', this).call(this, props);
        }

        _createClass(ParticipantView, [{
            key: 'render',
            value: function render() {
                var _this6 = this;

                var DOM = React.DOM;
                var heatCount = this.props.heatCount;
                var participant = this.state.participant;
                var heats = this.state.heats;

                return DOM.tr({
                    key: 'opened-participant-row-1',
                    className: 'non-selected ' + (this.props.opened ? 'selected' : ''),
                    onClick: function onClick() {
                        return _this6.props.onToggle();
                    }
                }, [DOM.td({ className: 'important middle-aligned col-sm-1' }, DOM.span({ className: 'race-number' }, participant.number)), DOM.td({ className: 'important middle-aligned col-sm-1' }, participant.country ? React.createElement(CountryFlagView, { country: participant.country }) : ''), DOM.td({ className: 'important middle-aligned col-sm-5' }, participant.name), DOM.td({ className: 'middle-aligned col-sm-3' }, participant.motorcycle), DOM.td({ className: 'important middle-aligned col-sm-1' }, R.min(heats.length, heatCount) + '/' + heatCount)]);
            }
        }]);

        return ParticipantView;
    })(Shuttle.React.Component);

    var AdditionalParticipantView = (function (_Shuttle$React$Component6) {
        _inherits(AdditionalParticipantView, _Shuttle$React$Component6);

        function AdditionalParticipantView(props) {
            var _this7 = this;

            _classCallCheck(this, AdditionalParticipantView);

            _get(Object.getPrototypeOf(AdditionalParticipantView.prototype), 'constructor', this).call(this, props);

            this.currentRow = Shuttle.ref(this.props.currentRow);

            this.detectNext = R.compose(function (data) {
                return data.participant;
            }, R.head, R.sortBy(function (item) {
                return item.count;
            }), R.map(function (participant) {
                return R.identity({
                    participant: participant,
                    count: R.length(R.filter(function (heat) {
                        return R.equals(heat.participant, participant.id);
                    }, _this7.state.heats))
                });
            }), R.map(function (ref) {
                return ref.get();
            }));
        }

        _createClass(AdditionalParticipantView, [{
            key: 'render',
            value: function render() {
                var _this8 = this;

                var DOM = React.DOM;
                var participant = this.state.participant;
                var currentRow = this.currentRow;
                var results = this.state.results;

                return DOM.tr({ key: 'opened-participant-row-2' }, [DOM.td({ style: { padding: '0' } }, React.createElement('center', { className: 'goto-next' }, this.props.opened ? React.createElement(ReactBootstrap.Glyphicon, {
                    onClick: function onClick() {
                        return _this8.props.onNext(_this8.detectNext(_this8.state.participants));
                    },
                    glyph: 'forward'
                }) : '')), DOM.td({ style: { padding: '0' }, colSpan: 3 }, [DOM.div({ className: 'non-selected-additional ' + (this.props.opened ? 'selected-additional' : '') }, React.createElement(ReactBootstrap.Table, {
                    className: 'inner-table group-table-striped group-table-hover',
                    responsive: true,
                    condensed: true
                }, [DOM.thead({}, DOM.tr({}, [DOM.td({}, ""), DOM.td({}, "Time"), DOM.td({}, "Penalty"), DOM.th({}, "Total"), DOM.td({}, "∆")])), R.addIndex(R.map)(function (result, i) {
                    return React.createElement(HeatView, {
                        key: i,

                        rowId: i,
                        currentRow: currentRow,
                        penaltyTypes: _this8.props.penaltyTypes,

                        result: result,
                        heats: _this8.props.heats
                    });
                }, results)]))]), DOM.td({ style: { padding: '0' }, colSpan: 3 })]);
            }
        }]);

        return AdditionalParticipantView;
    })(Shuttle.React.Component);

    var CompetitionView = (function (_Shuttle$React$Component7) {
        _inherits(CompetitionView, _Shuttle$React$Component7);

        function CompetitionView(props) {
            var _this9 = this;

            _classCallCheck(this, CompetitionView);

            _get(Object.getPrototypeOf(CompetitionView.prototype), 'constructor', this).call(this, props);

            this.state.current = R.head(R.filter(function (participant) {
                return R.equals(participant.id, _this9.props.params.participantId);
            }, R.map(function (participant) {
                return participant.get();
            }, this.state.participants)));
        }

        _createClass(CompetitionView, [{
            key: 'render',
            value: function render() {
                var _this10 = this;

                var DOM = React.DOM;
                var eventId = this.props.params.eventId;
                var heatCount = this.state.heatCount || 0;

                var data = R.map(function (participant) {
                    var opened = R.equals(_this10.state.current, participant.get());
                    var heats = _this10.props.heats.map(function (heats) {
                        return R.filter(function (heat) {
                            return R.equals(heat.participant, participant.get().id);
                        }, heats);
                    });

                    var results = heats.flatMap(function (heats) {
                        return Shuttle.sequence(R.map(function (heat) {
                            if (heat.result.type == 'TimedResult') return Shuttle.sequence(R.map(function (penalty) {
                                return _this10.state.penaltyTypes[penalty];
                            }, R.filter(function (penalty) {
                                return R.has(penalty, _this10.state.penaltyTypes);
                            }, heat.result.penalties))).map(function (penalties) {
                                return R.identity({
                                    id: heat.id,
                                    participant: heat.participant,
                                    number: heat.number,
                                    time: heat.result.time,
                                    penalties: heat.result.penalties,
                                    totalTime: R.min(moment.duration({
                                        minutes: 59,
                                        seconds: 59,
                                        milliseconds: 999
                                    }), R.reduce(function (time, delay) {
                                        return time.add(delay);
                                    }, moment.duration(heat.result.time), R.map(function (penalty) {
                                        return penalty.delay;
                                    }, penalties)))
                                });
                            });

                            if (heat.result.type == 'NoTimeResult') return Shuttle.ref({
                                id: heat.id,
                                participant: heat.participant,
                                number: heat.number,
                                time: null,
                                penalties: [],
                                totalTime: moment.duration({
                                    minutes: 59,
                                    seconds: 59,
                                    milliseconds: 999
                                })
                            });

                            throw 'undefined';
                        }, R.reduce(function (result, i) {
                            return R.append(R.find(function (heat) {
                                return heat.number == i + 1;
                            }, heats) || {
                                participant: participant.get().id,
                                number: i + 1,
                                result: {
                                    type: 'NoTimeResult'
                                }
                            }, result);
                        }, [], R.range(0, heatCount))));
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

                    return {
                        participant: participant,
                        opened: opened,
                        heats: heats,
                        results: results
                    };
                }, this.state.participants);

                return DOM.div({}, [React.createElement(ReactBootstrap.Pager, {}, [React.createElement(ReactBootstrap.PageItem, {
                    previous: true,
                    href: '#event/' + eventId + '/registration'
                }, [React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-left' }), ' ', "Registration"]), React.createElement(ReactBootstrap.PageItem, { href: '#event/' + eventId + '/competition' }, "Competition"), React.createElement(ReactBootstrap.PageItem, { next: true, href: '#event/' + eventId + '/results' }, ["Results", ' ', React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-right' })])]), React.createElement(ReactBootstrap.Table, {
                    key: 'table',
                    className: 'group-table-striped group-table-hover data-editable',
                    responsive: true,
                    hover: true
                }, [R.addIndex(R.map)(function (data, i) {
                    return DOM.tbody({ key: i }, [React.createElement(ParticipantView, {
                        key: 'main-' + i,
                        opened: data.opened,
                        onToggle: function onToggle() {
                            _this10.setState({ current: !data.opened ? data.participant.get() : null });
                        },
                        participant: data.participant,
                        heats: data.heats.map(function (heats) {
                            return R.filter(function (heat) {
                                return heat.result.type == 'TimedResult';
                            }, heats);
                        }),
                        heatCount: heatCount,
                        eventId: eventId
                    }), React.createElement(AdditionalParticipantView, {
                        key: 'additional-' + i,
                        opened: data.opened,
                        participant: data.participant,
                        heats: _this10.props.heats,
                        results: data.results,
                        penaltyTypes: _this10.props.penaltyTypes,
                        participants: _this10.props.participants,
                        onNext: function onNext(next) {
                            _this10.setState({ current: next });
                        }
                    })]);
                }, data)])]);
            }
        }]);

        return CompetitionView;
    })(Shuttle.React.Component);

    return CompetitionView;
});

//# sourceMappingURL=competition.js.map