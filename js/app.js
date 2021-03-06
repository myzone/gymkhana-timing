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

        'react': 'libs/react-0.13.3-production.min',
        'react-bootstrap': 'libs/react-bootstrap-0.26.4',
        'react-router': 'libs/react-router-1.0.0-rc1',
        'react-router-history': 'libs/react-router-history-1.0.0',
        'react-input-mask': 'libs/react-input-mask-0.1.3-PATCHED',
        'react-dropzone': 'libs/react-dropzone-2.1.0-PATCHED',

        'large-local-storage': 'libs/large-local-storage-0.1.3',
        'Q': 'libs/q-1.4.1',

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

        'models/application': 'models/application',

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

require(['react', 'react-bootstrap', 'react-router', 'react-router-history', 'ramda', 'moment', 'jquery', 'shuttle', 'shuttle-react', 'large-local-storage'], function (React, ReactBootstrap, ReactRouter, History, R, moment, $, Shuttle, ShuttleReact, LargeLocalStorage) {
    require(['models/application', 'views/page', 'views/events', 'views/event', 'views/configuration', 'views/registration', 'views/competition', 'views/results', 'views/create'], function (Application, PageView, EventsView, EventView, ConfigurationView, RegistrationView, CompetitionView, ResultsView, CreateView) {
        moment.locale('en');

        var desiredCapacity = 125 * 1024 * 1024;
        var storage = new LargeLocalStorage({ size: desiredCapacity, name: 'application-data-storage' });

        var bootstrapStorage = function bootstrapStorage(store, application) {

            var dropingToDisk = false;
            var unloadListener = function unloadListener() {
                if (!dropingToDisk) return;

                // Prevent multiple prompts - seen on Chrome and IE
                if (R.test(/msie|chrome/, R.toLower(navigator.userAgent))) {
                    if (window.aysHasPrompted) {
                        return;
                    }
                    window.aysHasPrompted = true;
                    window.setTimeout(function () {
                        window.aysHasPrompted = false;
                    }, 900);
                }

                return "Wait. Data is currently saving";
            };

            var loadApplication = function loadApplication() {
                return storage.getContents('application-data').then(function (raw) {
                    if (raw) {
                        store.set(Application.unmashall(raw));
                    }
                });
            };

            $(window).bind('beforeunload', unloadListener);

            return storage.initialized.then(function (initialized) {
                // Check to see how much space the user authorized us to actually use.
                // Some browsers don't indicate how much space was granted in which case
                // grantedCapacity will be 1.
                if (initialized.getCapacity() != -1 && initialized.getCapacity() != desiredCapacity) {
                    alert('fuck');
                }
            }).then(loadApplication).then(function () {
                var flush = function flush() {
                    dropingToDisk = true;

                    console.log('Flush has been started.');
                    storage.setContents('application-data', Application.marshall(application)).then(function () {
                        return localStorage.setItem('last-sync', moment().toISOString());
                    }).then(function () {
                        return console.info('Flush has been done.');
                    }).then(function () {
                        return dropingToDisk = false;
                    });
                };
                var noFlush = function noFlush() {};

                var listener = flush;

                $(window).bind('storage', function () {
                    listener = noFlush;

                    loadApplication().then(function () {
                        return listener = flush;
                    }).then(function () {
                        return console.info('Application has been reloaded.');
                    });
                });

                Shuttle.listenTree(function () {
                    return listener();
                }, application);
            }).then(function () {
                return application;
            });
        };

        var bootstrapReact = function bootstrapReact(application) {
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

                    if (!event) return Application.emptyEvent('', '');

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
                            configuration: event.flatMap(function (event) {
                                return event.configuration;
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

                        var configuration = event.flatMap(function (event) {
                            return event.configuration;
                        });

                        return React.createElement(CompetitionView, {
                            key: 'view',
                            params: this.props.params,
                            participants: event.flatMap(function (event) {
                                return event.participants;
                            }),
                            heats: event.flatMap(function (event) {
                                return event.heats;
                            }),
                            penaltyTypes: configuration.map(function (configuration) {
                                return configuration.penalties;
                            }),
                            heatCount: configuration.map(function (configuration) {
                                return configuration.heatCount;
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

            var history = History.createHashHistory();

            history.listen(function (location) {
                ga('send', {
                    hitType: 'pageview',
                    page: '' + location.pathname + location.search
                });
            });

            React.render(React.createElement(Main, { key: 'main', history: history }, [React.createElement(ReactRouter.Router, { key: 'router' }, [React.createElement(ReactRouter.Route, {
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
        };

        var store = Shuttle.ref(Application.empty());
        var application = store.flatMap(R.identity);

        bootstrapStorage(store, application).then(function () {
            return console.log('Data loaded from storage');
        })['catch'](function (e) {
            return console.error('Data DID NOT load from storage', e);
        });

        bootstrapReact(application);

        window.R = R;
        window.s = Shuttle;
        window.m = moment;
        window.clear = function () {
            return storage.setContents('application-data', "{}");
        };
    });
});

//# sourceMappingURL=app.js.map