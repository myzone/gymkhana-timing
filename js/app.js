'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require.config({
    paths: {
        'ramda': 'libs/ramda-0.17.1.min',
        'jquery': 'libs/jquery-2.1.3',

        'moment': 'libs/moment-with-locales-2.10.2',
        'moment-durations': 'libs/moment-duration-format-1.3.0',

        'react': 'libs/react-0.13.1',
        'react-bootstrap': 'libs/react-bootstrap-0.25.2',
        'react-router': 'libs/react-router-1.0.0-rc1',
        'react-input-mask': 'libs/react-input-mask-0.1.3-PATCHED',

        'shuttle': 'libs/shuttle-snapshot',
        'shuttle-react': 'libs/shuttle-react-snapshot',

        'photoswipe': 'libs/photoswipe-4.1.0',
        'photoswipe-ui': 'libs/photoswipe-ui-default-4.1.0',

        'unslider': 'libs/unslider-1.0.0',
        'justified': 'libs/jquery.justified-1.0.0',
        'parallax': 'libs/parallax-2.1.3',

        'views/page': 'views/page',
        'views/events': 'views/events',
        'views/event': 'views/event',
        'views/registration': 'views/registration',
        'views/competition': 'views/competition',
        'views/results': 'views/results',

        'components/text-cell': 'views/components/text-cell',
        'components/date-cell': 'views/components/date-cell',
        'components/select-cell': 'views/components/select-cell',
        'components/stopwatch-cell': 'views/components/stopwatch-cell',

        'utils/commons': 'utils/commons'
    },
    shim: {
        'justified': {
            deps: ['jquery']
        },
        'unslider': {
            deps: ['jquery']
        },
        'c3': {
            deps: ['d3']
        }
    },
    waitSeconds: 120
});

require(['react', 'react-bootstrap', 'react-router', 'ramda', 'moment', 'jquery', 'shuttle', 'shuttle-react'], function (React, ReactBootstrap, ReactRouter, R, moment, $, Shuttle, ShuttleReact) {
    require(['views/page', 'views/events', 'views/event', 'views/configuration', 'views/registration', 'views/competition', 'views/results'], function (PageView, EventsView, EventView, ConfigurationView, RegistrationView, CompetitionView, ResultsView) {
        var exampleApplication = function exampleApplication() {
            var myzone = Shuttle.ref({
                id: '3',
                number: "43",
                country: "ua",
                name: "Vyacheslav Goldenshteyn1",
                motorcycle: "Honda FMX 650",
                group: "Group 3B",
                birthday: "2015-09-01",
                team: "Sommmmm Team"
            });

            return Shuttle.ref({
                id: Shuttle.ref({
                    id: 'id',
                    configuration: Shuttle.ref({
                        name: "Championship of Ukraine 2013"
                    }),
                    participants: Shuttle.ref([Shuttle.ref({
                        id: '2',
                        number: "43",
                        country: "ua",
                        name: "Vyacheslavzaza11 Goldenshteyn1",
                        motorcycle: "Honda FMX 650",
                        group: "Group 3B",
                        birthday: "2015-09-01",
                        team: "Sommmmm Team"
                    }), myzone]),
                    heats: Shuttle.ref([{
                        id: "94",
                        participant: myzone,
                        number: 1,
                        result: {
                            type: 'TimedResult',
                            time: moment.duration({
                                minutes: 1,
                                seconds: 25,
                                milliseconds: 13
                            }),
                            penalties: [{
                                name: '+1',
                                type: 'critical',
                                delay: moment.duration({ seconds: 1 })
                            }, {
                                name: '+1',
                                type: 'critical',
                                delay: moment.duration({ seconds: 1 })
                            }]
                        }
                    }])
                })
            });
        };

        var loadApplication = function loadApplication() {
            var savedData = JSON.parse(localStorage.getItem('application-data'));

            var application = R.mapObj(function (event) {
                return {
                    id: event.id,
                    configuration: Shuttle.ref({
                        name: event.configuration.name
                    }),
                    participants: Shuttle.ref(R.map(function (participant) {
                        return Shuttle.ref({
                            id: participant.id,
                            number: participant.number,
                            country: participant.country,
                            name: participant.name,
                            motorcycle: participant.motorcycle,
                            group: participant.group,
                            birthday: participant.birthday,
                            team: participant.team
                        });
                    }, event.participants)),
                    heats: R.map(function (heat) {
                        return {
                            id: heat.id,
                            participant: heat.participant,
                            number: heat.number,
                            result: {
                                type: heat.result.type,
                                time: heat.result.time ? moment.duration(heat.result.time) : undefined,
                                penalties: heat.result.penalties ? R.map(function (penalty) {
                                    return {
                                        name: penalty.name,
                                        type: penalty.type,
                                        delay: moment.duration(penalty.delay)
                                    };
                                }, heat.result.penalties) : undefined
                            }
                        };
                    }, event.heats)
                };
            }, savedData);

            application = R.mapObj(function (event) {
                event.heats = Shuttle.ref(R.map(function (heat) {
                    heat.participant = R.find(function (participant) {
                        return R.equals(participant.get(), heat.participant);
                    }, event.participants.get());

                    return heat;
                }, event.heats));

                return Shuttle.ref(event);
            }, application);

            return Shuttle.ref(application);
        };

        //const application = exampleApplication();
        var application = loadApplication();
        setInterval(function () {
            localStorage.setItem('application-data', JSON.stringify(Shuttle.json(application)));
        }, 1000);

        var Main = React.createClass({
            displayName: 'Main',

            mixins: [Shuttle.React.Mixin],
            render: function render() {
                var DOM = React.DOM;

                return DOM.div({ key: 'main-root' }, [R.addIndex(R.map)(function (stylesheet, i) {
                    return DOM.link({ key: i, rel: 'stylesheet', href: stylesheet });
                }, ['css/style.css', 'css/bootstrap.css', 'css/photoswipe.css', 'css/photoswipe-default-skin.css', 'css/jquery.justified.css', 'css/vis.min.css', 'css/c3.css', 'css/timeline.css']), this.props.children]);
            }
        });

        var EventsApplicationProvider = (function (_React$Component) {
            _inherits(EventsApplicationProvider, _React$Component);

            function EventsApplicationProvider() {
                _classCallCheck(this, EventsApplicationProvider);

                _get(Object.getPrototypeOf(EventsApplicationProvider.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(EventsApplicationProvider, [{
                key: 'render',
                value: function render() {
                    return React.createElement(EventsView, {
                        key: 'view',
                        params: this.props.params,
                        events: application.map(function (application) {
                            return R.values(application);
                        })
                    });
                }
            }]);

            return EventsApplicationProvider;
        })(React.Component);

        var RegistrationApplicationProvider = (function (_React$Component2) {
            _inherits(RegistrationApplicationProvider, _React$Component2);

            function RegistrationApplicationProvider() {
                _classCallCheck(this, RegistrationApplicationProvider);

                _get(Object.getPrototypeOf(RegistrationApplicationProvider.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(RegistrationApplicationProvider, [{
                key: 'render',
                value: function render() {
                    var _this = this;

                    var event = application.flatMap(function (application) {
                        return application[_this.props.params.eventId];
                    });

                    return React.createElement(RegistrationView, {
                        key: 'view',
                        params: this.props.params,
                        participants: event.flatMap(function (event) {
                            return event.participants;
                        })
                    });
                }
            }]);

            return RegistrationApplicationProvider;
        })(React.Component);

        var CompetitionApplicationProvider = (function (_React$Component3) {
            _inherits(CompetitionApplicationProvider, _React$Component3);

            function CompetitionApplicationProvider() {
                _classCallCheck(this, CompetitionApplicationProvider);

                _get(Object.getPrototypeOf(CompetitionApplicationProvider.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(CompetitionApplicationProvider, [{
                key: 'render',
                value: function render() {
                    var _this2 = this;

                    var event = application.flatMap(function (application) {
                        return application[_this2.props.params.eventId];
                    });

                    return React.createElement(CompetitionView, {
                        key: 'view',
                        params: this.props.params,
                        participants: event.flatMap(function (event) {
                            return event.participants;
                        }),
                        heats: event.flatMap(function (event) {
                            return event.heats;
                        })
                    });
                }
            }]);

            return CompetitionApplicationProvider;
        })(React.Component);

        var ResultsApplicationProvider = (function (_React$Component4) {
            _inherits(ResultsApplicationProvider, _React$Component4);

            function ResultsApplicationProvider() {
                _classCallCheck(this, ResultsApplicationProvider);

                _get(Object.getPrototypeOf(ResultsApplicationProvider.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(ResultsApplicationProvider, [{
                key: 'render',
                value: function render() {
                    var _this3 = this;

                    var event = application.flatMap(function (application) {
                        return application[_this3.props.params.eventId];
                    });

                    return React.createElement(ResultsView, {
                        key: 'view',
                        params: this.props.params,
                        participants: event.flatMap(function (event) {
                            return event.participants;
                        }),
                        heats: event.flatMap(function (event) {
                            return event.heats;
                        })
                    });
                }
            }]);

            return ResultsApplicationProvider;
        })(React.Component);

        React.render(React.createElement(Main, { key: 'main' }, [React.createElement(PageView, { key: 'page' }, [React.createElement(ReactRouter.Router, { key: 'router' }, [React.createElement(ReactRouter.Route, {
            key: 'index-route',
            path: '/',
            component: EventsApplicationProvider
        }), React.createElement(ReactRouter.Route, {
            key: 'event-route',
            path: 'event/:eventId',
            component: EventView
        }, [React.createElement(ReactRouter.IndexRoute, {
            key: 'event-index-route',
            component: RegistrationApplicationProvider
        }),
        //React.createElement(ReactRouter.Route, {
        //    key: 'event-configuration-route',
        //    path: 'configuration',
        //    component: ConfigurationView
        //}),
        React.createElement(ReactRouter.Route, {
            key: 'event-registration-route',
            path: 'registration',
            component: RegistrationApplicationProvider
        }), React.createElement(ReactRouter.Route, {
            key: 'event-competition-route',
            path: 'competition(/:participantId)',
            component: CompetitionApplicationProvider
        }), React.createElement(ReactRouter.Route, {
            key: 'event-results-route',
            path: 'results',
            component: ResultsApplicationProvider
        })])])])]), document.getElementById('root'));

        window.R = R;
        window.s = Shuttle;
        window.m = moment;
    });
});

//# sourceMappingURL=app.js.map