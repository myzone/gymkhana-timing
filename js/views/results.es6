define(['react', 'react-router', 'react-bootstrap', 'ramda', 'moment', 'moment-durations', 'shuttle', 'shuttle-react', 'components/stopwatch-cell', 'components/country-flag', 'utils/commons'], (React, ReactRouter, ReactBootstrap, R, moment, momentDurations, Shuttle, ShuttleReact, StopwatchCellView, CountryFlagView, Commons) => {
    const PENALTY_STYLES = {
        negligible: 'default',
        significant: 'warning',
        critical: 'danger'
    };

    const renderDuration = duration => duration.format("mm:ss.SSS", {trim: false});

    class FirstPlaceView {
        render() {
            const DOM = React.DOM;

            return DOM.td({className: 'col-md-3'}, [
                React.createElement('center', {}, DOM.div({style: {marginTop: '0px'}}, [
                    DOM.span({className: 'race-number', style: {fontSize: '25px'}}, this.props.number),
                    ' ',
                    DOM.span({}, this.props.name)
                ])),
                DOM.div({
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
                }, "1")))
            ]);
        }
    }
    class SecondPlaceView {
        render() {
            const DOM = React.DOM;

            return DOM.td({className: 'col-md-3'}, [
                React.createElement('center', {}, DOM.div({style: {marginTop: '20px'}}, [
                    DOM.span({className: 'race-number', style: {fontSize: '25px'}}, this.props.number),
                    ' ',
                    DOM.span({}, this.props.name)
                ])),
                DOM.div({
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
                }, "2")))
            ]);
        }
    }
    class ThirdPlaceView {
        render() {
            const DOM = React.DOM;

            return DOM.td({className: 'col-md-3'}, [
                React.createElement('center', {}, DOM.div({style: {marginTop: '40px'}}, [
                    DOM.span({className: 'race-number', style: {fontSize: '25px'}}, this.props.number),
                    ' ',
                    DOM.span({}, this.props.name)
                ])),
                DOM.div({
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
                }, "3")))
            ]);
        }
    }


    class WinnersView extends Shuttle.React.Component {
        render() {
            const DOM = React.DOM;

            const firstPlace = this.state.firstPlace;
            const secondPlace = this.state.secondPlace;
            const thirdPlace = this.state.thirdPlace;

            return DOM.table({style: {width: '100%'}}, DOM.tr({}, [
                DOM.td({style: {width: '250px'}}),
                secondPlace ? React.createElement(SecondPlaceView, {
                    name: secondPlace.name,
                    number: secondPlace.number
                }) : DOM.td(),
                firstPlace ? React.createElement(FirstPlaceView, {
                    name: firstPlace.name,
                    number: firstPlace.number
                }) : DOM.td(),
                thirdPlace ? React.createElement(ThirdPlaceView, {
                    name: thirdPlace.name,
                    number: thirdPlace.number
                }) : DOM.td(),
                DOM.td({style: {width: '250px'}})
            ]));
        }
    }


    class PenaltyView extends Shuttle.React.Component {

        render() {
            const penalty = this.state.penalty;
            const i = this.props.i;

            return React.createElement(ReactBootstrap.Label, {
                key: i,
                bsStyle: PENALTY_STYLES[penalty.type]
            }, penalty.name);
        }

    }


    class ParticipantView extends Shuttle.React.Component {
        render() {
            const DOM = React.DOM;
            const participant = this.state.participant;

            return DOM.tr({}, [
                DOM.td({className: 'middle-aligned', style: {fontSize: '25px', width: '50px'}}, DOM.span({className: 'race-number'}, participant.number)),
                DOM.td({className: 'middle-aligned', style: {width: '50px'}}, participant.country ? React.createElement(CountryFlagView, {country: participant.country}) : ''),
                DOM.td({className: 'middle-aligned col-sm-4'}, participant.name),
                DOM.td({className: 'middle-aligned col-sm-4'}, participant.motorcycle),
                DOM.td({className: 'middle-aligned col-sm-3'}, participant.birthday.fromNow(true))
            ])
        }
    }

    class HeatsView extends React.Component {

        render() {
            const DOM = React.DOM;
            const heats = this.props.heats;
            const penaltyTypes = this.props.penaltyTypes;

            return DOM.tr({}, [
                DOM.td({style: {padding: '0'}}),
                DOM.td({style: {padding: '0'}, colSpan: 3}, [
                    DOM.div({}, React.createElement(ReactBootstrap.Table, {
                        className: 'inner-table',
                        responsive: true,
                        striped: true,
                        condensed: true
                    }, [
                        DOM.thead({}, DOM.tr({}, [
                            DOM.td({}, ""),
                            DOM.td({}, "Time"),
                            DOM.td({}, "Penalty"),
                            DOM.th({}, "Total"),
                            DOM.td({}, "∆")
                        ])),
                        DOM.tbody({}, R.addIndex(R.map)((heat, i) => {
                            return DOM.tr({key: i}, [
                                DOM.td({}, heat.number),
                                DOM.td({className: 'col-sm-2'}, heat.time ? renderDuration(heat.time) : ''),
                                DOM.td({className: 'col-sm-10'}, R.addIndex(R.map)((penalty, i) => [React.createElement(PenaltyView, {
                                    i: i,
                                    penalty: penaltyTypes[penalty]
                                }), ' '], heat.penalties)),
                                DOM.td({className: 'col-md-2'}, renderDuration(heat.totalTime)),
                                DOM.td({className: 'col-md-2'}, `+${renderDuration(heat.deltaTime)}`)
                            ]);
                        }, R.sortBy(heat => heat.number, heats)))
                    ]))
                ]),
                DOM.td({style: {padding: '0'}, colSpan: 3})
            ]);
        }
    }

    class ResultTableView extends Shuttle.React.Component {
        render() {
            const DOM = React.DOM;
            const results = this.state.results;
            const penaltyTypes = this.props.penaltyTypes;

            return React.createElement(ReactBootstrap.Panel, {}, React.createElement(ReactBootstrap.Table, {
                key: 'table',
                className: 'group-table-striped group-table-hover data-editable',
                responsive: true,
                fill: true
            }, [
                R.addIndex(R.map)((result, i) => {
                    return DOM.tbody({key: i}, [
                        React.createElement(ParticipantView, {participant: result.participant, heats: result.heats}),
                        React.createElement(HeatsView, {heats: result.heats, bestTime: result.bestTime, penaltyTypes: penaltyTypes})
                    ])
                }, results)
            ]))
        }
    }

    class ResultsView extends Shuttle.React.Component {
        render() {
            const DOM = React.DOM;
            const eventId = this.props.params.eventId;
            const penaltyTypes = this.state.penaltyTypes;

            const totalTime = (heat) => R.reduce((time, delay) => time.add(delay), moment.duration(heat.result.time), R.map(penalty => penaltyTypes[penalty].delay, heat.result.penalties));
            const semiResults = this.props.heats
                .map(R.compose(
                    R.sortBy(heat => heat.bestTime),
                    R.values,
                    R.mapObjIndexed((heats, participant) => R.identity({
                        participant: participant,
                        bestTime: R.reduce(R.min, Infinity, R.map(heat => heat.totalTime, heats)),
                        heats: heats
                    })),
                    R.groupBy(heat => heat.participant),
                    R.map(heat => R.identity({
                        participant: heat.participant,
                        number: heat.number,
                        time: heat.result.time,
                        penalties: heat.result.penalties,
                        totalTime: totalTime(heat)
                    })),
                    R.filter(heat => heat.result.type == 'TimedResult')
                ));
            const results = Shuttle.combine([semiResults, this.props.participants], (results, participants) => {
                return R.map(result => R.identity({
                    participant: R.find(participant => R.equals(result.participant, participant.get().id), participants),
                    bestTime: result.bestTime,
                    heats: R.map(heat => R.identity({
                        participant: heat.participant,
                        number: heat.number,
                        time: heat.time,
                        penalties: heat.penalties,
                        totalTime: heat.totalTime,
                        deltaTime: moment.duration(heat.totalTime).subtract(result.bestTime)
                    }),result.heats)
                }), results);
            });
            const winners = results.map(R.map(result => result.participant));

            return DOM.div({}, [
                React.createElement(ReactBootstrap.Pager, {}, [
                    React.createElement(ReactBootstrap.PageItem, {
                        previous: true,
                        href: `#event/${eventId}/competition`
                    }, [
                        React.createElement(ReactBootstrap.Glyphicon, {glyph: 'menu-left'}), ' ', "Competition"
                    ]),
                    React.createElement(ReactBootstrap.PageItem, {href: `#event/${eventId}/results`}, "Results")
                ]),

                React.createElement(WinnersView, {
                    firstPlace: winners.flatMap(winners => winners.length > 0 ? winners[0] : Shuttle.ref(null)),
                    secondPlace: winners.flatMap(winners => winners.length > 1 ? winners[1] : Shuttle.ref(null)),
                    thirdPlace: winners.flatMap(winners => winners.length > 2 ? winners[2] : Shuttle.ref(null))
                }),

                React.createElement(ResultTableView, {results: results, penaltyTypes: penaltyTypes})
            ]);
        }

    }

    return ResultsView;
});
