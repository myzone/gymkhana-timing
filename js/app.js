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

        'datetime-picker': 'libs/bootstrap-datetimepicker-4.17.37.min',

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
        'views/create': 'views/create',
        'views/delete': 'views/delete',
        'views/import': 'views/import',
        'views/export': 'views/export',

        'components/text-cell': 'views/components/text-cell',
        'components/date-cell': 'views/components/date-cell',
        'components/select-cell': 'views/components/select-cell',
        'components/toggle-cell': 'views/components/toggle-cell',
        'components/stopwatch-cell': 'views/components/stopwatch-cell',
        'components/editable-table': 'views/components/editable-table',
        'components/country-flag': 'views/components/country-flag',

        'utils/commons': 'utils/commons',

        'static-data/countries': 'static-data/countries',
        'static-data/penalty-type': 'static-data/penalty-type'
    },
    shim: {
        'datetime-picker': {
            deps: ['jquery']
        },
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
    require(['views/page', 'views/events', 'views/event', 'views/configuration', 'views/registration', 'views/competition', 'views/results', 'views/create'], function (PageView, EventsView, EventView, ConfigurationView, RegistrationView, CompetitionView, ResultsView, CreateView) {
        moment.locale('en');

        var exampleApplication = function exampleApplication() {
            return Shuttle.ref({
                id: Shuttle.ref({
                    id: 'id',
                    configuration: Shuttle.ref({
                        name: "Championship of Ukraine 2013",
                        penalties: {},
                        countries: []
                    }),
                    participants: Shuttle.ref([]),
                    heats: Shuttle.ref([])
                })
            });
        };

        var loadApplication = function loadApplication() {
            var savedData = JSON.parse(localStorage.getItem('application-data'));

            return Shuttle.ref(R.mapObj(function (event) {
                return Shuttle.ref({
                    id: event.id,
                    configuration: Shuttle.ref({
                        name: event.configuration.name,
                        penalties: R.mapObj(function (penalty) {
                            return Shuttle.ref({
                                id: penalty.id,
                                name: penalty.name,
                                description: penalty.description,
                                delay: moment.duration(penalty.delay),
                                type: penalty.type
                            });
                        }, event.configuration.penalties),
                        countries: event.configuration.countries
                    }),
                    participants: Shuttle.ref(R.map(function (participant) {
                        return Shuttle.ref({
                            id: participant.id,
                            number: participant.number,
                            country: participant.country,
                            name: participant.name,
                            motorcycle: participant.motorcycle,
                            group: participant.group,
                            birthday: moment(participant.birthday),
                            team: participant.team
                        });
                    }, event.participants)),
                    heats: Shuttle.ref(R.map(function (heat) {
                        return R.identity({
                            id: heat.id,
                            participant: heat.participant,
                            number: heat.number,
                            result: {
                                type: heat.result.type,
                                time: heat.result.time ? moment.duration(heat.result.time) : undefined,
                                penalties: heat.result.penalties
                            }
                        });
                    }, event.heats))
                });
            }, savedData));
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
                }, ['css/style.css', 'css/bootstrap.css', 'css/bootstrap-datetimepicker-4.17.37.css', 'css/photoswipe.css', 'css/photoswipe-default-skin.css', 'css/jquery.justified.css', 'css/vis.min.css', 'css/c3.css', 'css/timeline.css']), this.props.children]);
            }
        });

        var PageApplicationProvider = (function (_React$Component) {
            _inherits(PageApplicationProvider, _React$Component);

            function PageApplicationProvider() {
                _classCallCheck(this, PageApplicationProvider);

                _get(Object.getPrototypeOf(PageApplicationProvider.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(PageApplicationProvider, [{
                key: 'render',
                value: function render() {
                    return React.createElement(PageView, {
                        key: 'view',
                        params: this.props.params,
                        location: this.props.location,
                        application: application
                    }, this.props.children);
                }
            }]);

            return PageApplicationProvider;
        })(React.Component);

        var EventsApplicationProvider = (function (_React$Component2) {
            _inherits(EventsApplicationProvider, _React$Component2);

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
                        }),
                        application: application
                    }, this.props.children);
                }
            }]);

            return EventsApplicationProvider;
        })(React.Component);

        var getEvent = function getEvent(eventId) {
            return function (application) {
                var event = application[eventId];

                if (!event) return Shuttle.ref({
                    id: '',
                    configuration: Shuttle.ref({
                        name: '',
                        penalties: {},
                        countries: []
                    }),
                    participants: Shuttle.ref([]),
                    heats: Shuttle.ref([])
                });

                return event;
            };
        };

        var EventApplicationProvider = (function (_React$Component3) {
            _inherits(EventApplicationProvider, _React$Component3);

            function EventApplicationProvider() {
                _classCallCheck(this, EventApplicationProvider);

                _get(Object.getPrototypeOf(EventApplicationProvider.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(EventApplicationProvider, [{
                key: 'render',
                value: function render() {
                    var event = application.flatMap(getEvent(this.props.params.eventId));

                    return React.createElement(EventView, {
                        key: 'view',
                        params: this.props.params,
                        name: event.flatMap(function (event) {
                            return event.configuration;
                        }).map(function (configuration) {
                            return configuration.name;
                        }),
                        application: application
                    }, this.props.children);
                }
            }]);

            return EventApplicationProvider;
        })(React.Component);

        var ConfigurationApplicationProvider = (function (_React$Component4) {
            _inherits(ConfigurationApplicationProvider, _React$Component4);

            function ConfigurationApplicationProvider() {
                _classCallCheck(this, ConfigurationApplicationProvider);

                _get(Object.getPrototypeOf(ConfigurationApplicationProvider.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(ConfigurationApplicationProvider, [{
                key: 'render',
                value: function render() {
                    var event = application.flatMap(getEvent(this.props.params.eventId));

                    return React.createElement(ConfigurationView, {
                        key: 'view',
                        params: this.props.params,
                        configuration: event.flatMap(function (event) {
                            return event.configuration;
                        })
                    }, this.props.children);
                }
            }]);

            return ConfigurationApplicationProvider;
        })(React.Component);

        var RegistrationApplicationProvider = (function (_React$Component5) {
            _inherits(RegistrationApplicationProvider, _React$Component5);

            function RegistrationApplicationProvider() {
                _classCallCheck(this, RegistrationApplicationProvider);

                _get(Object.getPrototypeOf(RegistrationApplicationProvider.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(RegistrationApplicationProvider, [{
                key: 'render',
                value: function render() {
                    var event = application.flatMap(getEvent(this.props.params.eventId));

                    return React.createElement(RegistrationView, {
                        key: 'view',
                        params: this.props.params,
                        participants: event.flatMap(function (event) {
                            return event.participants;
                        }),
                        countries: event.flatMap(function (event) {
                            return event.configuration;
                        }).map(function (configuration) {
                            return configuration.countries;
                        })
                    }, this.props.children);
                }
            }]);

            return RegistrationApplicationProvider;
        })(React.Component);

        var CompetitionApplicationProvider = (function (_React$Component6) {
            _inherits(CompetitionApplicationProvider, _React$Component6);

            function CompetitionApplicationProvider() {
                _classCallCheck(this, CompetitionApplicationProvider);

                _get(Object.getPrototypeOf(CompetitionApplicationProvider.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(CompetitionApplicationProvider, [{
                key: 'render',
                value: function render() {
                    var event = application.flatMap(getEvent(this.props.params.eventId));

                    return React.createElement(CompetitionView, {
                        key: 'view',
                        params: this.props.params,
                        participants: event.flatMap(function (event) {
                            return event.participants;
                        }),
                        heats: event.flatMap(function (event) {
                            return event.heats;
                        }),
                        penaltyTypes: event.flatMap(function (event) {
                            return event.configuration;
                        }).map(function (configuration) {
                            return configuration.penalties;
                        })
                    }, this.props.children);
                }
            }]);

            return CompetitionApplicationProvider;
        })(React.Component);

        var ResultsApplicationProvider = (function (_React$Component7) {
            _inherits(ResultsApplicationProvider, _React$Component7);

            function ResultsApplicationProvider() {
                _classCallCheck(this, ResultsApplicationProvider);

                _get(Object.getPrototypeOf(ResultsApplicationProvider.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(ResultsApplicationProvider, [{
                key: 'render',
                value: function render() {
                    var event = application.flatMap(getEvent(this.props.params.eventId));

                    return React.createElement(ResultsView, {
                        key: 'view',
                        params: this.props.params,
                        participants: event.flatMap(function (event) {
                            return event.participants;
                        }),
                        heats: event.flatMap(function (event) {
                            return event.heats;
                        }),
                        penaltyTypes: event.flatMap(function (event) {
                            return event.configuration;
                        }).map(function (configuration) {
                            return configuration.penalties;
                        })
                    }, this.props.children);
                }
            }]);

            return ResultsApplicationProvider;
        })(React.Component);

        React.render(React.createElement(Main, { key: 'main' }, [React.createElement(ReactRouter.Router, { key: 'router' }, [React.createElement(ReactRouter.Route, {
            key: 'page',
            path: '/',
            component: PageApplicationProvider
        }, [React.createElement(ReactRouter.IndexRoute, {
            key: 'index-route',
            component: EventsApplicationProvider
        }), React.createElement(ReactRouter.Route, {
            key: 'event-route',
            path: 'event/:eventId',
            component: EventApplicationProvider
        }, [React.createElement(ReactRouter.IndexRoute, {
            key: 'event-index-route',
            component: RegistrationApplicationProvider
        }), React.createElement(ReactRouter.Route, {
            key: 'event-configuration-route',
            path: 'configuration',
            component: ConfigurationApplicationProvider
        }), React.createElement(ReactRouter.Route, {
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