define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment) => {
    class FirstPlaceView {
        render() {
            const DOM = React.DOM;

            return DOM.td({className: 'col-md-3'}, [
                React.createElement('center', {}, DOM.div({style: {marginTop: '0px'}}, [
                    DOM.span({className: 'race-number'}, this.props.number),
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
                    DOM.span({className: 'race-number'}, this.props.number),
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
                    DOM.span({className: 'race-number'}, this.props.number),
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
                secondPlace ? React.createElement(SecondPlaceView, {name: secondPlace.name, number: secondPlace.number}) : DOM.td(),
                firstPlace ? React.createElement(FirstPlaceView, {name: firstPlace.name, number: firstPlace.number}) : DOM.td(),,
                thirdPlace ? React.createElement(ThirdPlaceView, {name: thirdPlace.name, number: thirdPlace.number}) : DOM.td(),,
                DOM.td({style: {width: '250px'}})
            ]));
        }
    }

    class ResultsView extends React.Component {
        render() {
            const DOM = React.DOM;
            const eventId = this.props.params.eventId;

            const totalTime = (heat) => R.reduce((time, delay) => time.add(delay), moment.duration(heat.result.time), R.map(penalty => penalty.delay, heat.result.penalties));
            const winners = this.props.heats
                .map(heats => R.filter(heat => heat.result.type == 'TimedResult', heats))
                .map(heats => R.map(heat => {
                    return {
                        participant: heat.participant,
                        totalTime: totalTime(heat)
                    }
                }, heats))
                .map(heats => (R.sortBy(heat => -heat.totalTime, heats)))
                .map(heats => R.map(heat => heat.participant, heats))

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
                    firstPlace: winners.flatMap(winners => winners.length > 0 ? winners[0] : null),
                    secondPlace: winners.flatMap(winners => winners.length > 1 ? winners[1] : null),
                    thirdPlace: winners.flatMap(winners => winners.length > 2 ? winners[2] : null)
                })
                //React.createElement(TableView, {})
            ]);
        }

    }

    return ResultsView;
});
