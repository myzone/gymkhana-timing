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


require(['react', 'react-bootstrap', 'react-router', 'react-router-history', 'ramda', 'moment', 'jquery', 'shuttle', 'shuttle-react', 'large-local-storage'], (React, ReactBootstrap, ReactRouter, History, R, moment, $, Shuttle, ShuttleReact, LargeLocalStorage) => {
    require(['models/application', 'views/page', 'views/events', 'views/event', 'views/configuration', 'views/registration', 'views/competition', 'views/results', 'views/create'], (Application, PageView, EventsView, EventView, ConfigurationView, RegistrationView, CompetitionView, ResultsView, CreateView) => {
            moment.locale('en');

            const desiredCapacity = 125 * 1024 * 1024;
            const storage = new LargeLocalStorage({size: desiredCapacity, name: 'application-data-storage'});

            const bootstrapStorage = (store, application) => {

                let dropingToDisk = false;
                const unloadListener = () => {
                    if (!dropingToDisk)
                        return;

                    // Prevent multiple prompts - seen on Chrome and IE
                    if (R.test(/msie|chrome/, R.toLower(navigator.userAgent))) {
                        if (window.aysHasPrompted) {
                            return;
                        }
                        window.aysHasPrompted = true;
                        window.setTimeout(() => {
                            window.aysHasPrompted = false;
                        }, 900);
                    }

                    return "Wait. Data is currently saving";
                };

                const loadApplication = () => storage
                    .getContents('application-data')
                    .then(raw => {
                        if (raw) {
                            store.set(Application.unmashall(raw))
                        }
                    });

                $(window).bind('beforeunload', unloadListener);

                return storage.initialized
                    .then(initialized => {
                        // Check to see how much space the user authorized us to actually use.
                        // Some browsers don't indicate how much space was granted in which case
                        // grantedCapacity will be 1.
                        if (initialized.getCapacity() != -1 && initialized.getCapacity() != desiredCapacity) {
                            alert(`fuck`)
                        }
                    })
                    .then(loadApplication)
                    .then(() => {
                        const flush = () => {
                            dropingToDisk = true;

                            console.log('Flush has been started.');
                            storage.setContents('application-data', Application.marshall(application))
                                .then(() => localStorage.setItem('last-sync', moment().toISOString()))
                                .then(() => console.info('Flush has been done.'))
                                .then(() => dropingToDisk = false);
                        };
                        const noFlush = () => {
                        };

                        let listener = flush;

                        $(window).bind('storage', () => {
                            listener = noFlush;

                            loadApplication()
                                .then(() => listener = flush)
                                .then(() => console.info('Application has been reloaded.'));
                        });

                        Shuttle.listenTree(() => listener(), application);
                    })
                    .then(() => application);
            };

            const bootstrapReact = application => {
                const Main = React.createClass({
                    mixins: [Shuttle.React.Mixin],
                    render: function () {
                        var DOM = React.DOM;

                        return DOM.div({key: 'main-root'}, [
                            R.addIndex(R.map)((stylesheet, i) => {
                                return DOM.link({key: i, rel: 'stylesheet', href: stylesheet});
                            }, [
                                'css/style.css',
                                'css/bootstrap.css',
                                'css/bootstrap-datetimepicker-4.17.37.css',
                                'css/photoswipe.css',
                                'css/photoswipe-default-skin.css',
                                'css/jquery.justified.css',
                                'css/vis.min.css',
                                'css/c3.css',
                                'css/timeline.css'
                            ]),

                            this.props.children
                        ]);
                    }
                });

                class PageApplicationProvider extends React.Component {
                    render() {
                        return React.createElement(PageView, {
                            key: 'view',
                            params: this.props.params,
                            location: this.props.location,
                            application: application
                        }, this.props.children);
                    }
                }

                class EventsApplicationProvider extends React.Component {
                    render() {
                        return React.createElement(EventsView, {
                            key: 'view',
                            params: this.props.params,
                            events: application
                                .map(application => R.values(application)),
                            application: application
                        }, this.props.children);
                    }
                }

                const getEvent = eventId => application => {
                    const event = application[eventId];

                    if (!event)
                        return Application.emptyEvent('', '');

                    return event;
                };


                class EventApplicationProvider extends React.Component {
                    render() {
                        const event = application
                            .flatMap(getEvent(this.props.params.eventId));

                        return React.createElement(EventView, {
                            key: 'view',
                            params: this.props.params,
                            configuration: event
                                .flatMap(event => event.configuration),
                            application: application
                        }, this.props.children);
                    }
                }

                class ConfigurationApplicationProvider extends React.Component {
                    render() {
                        const event = application
                            .flatMap(getEvent(this.props.params.eventId));

                        return React.createElement(ConfigurationView, {
                            key: 'view',
                            params: this.props.params,
                            configuration: event
                                .flatMap(event => event.configuration)
                        }, this.props.children);
                    }
                }

                class RegistrationApplicationProvider extends React.Component {
                    render() {
                        const event = application
                            .flatMap(getEvent(this.props.params.eventId));

                        return React.createElement(RegistrationView, {
                            key: 'view',
                            params: this.props.params,
                            participants: event
                                .flatMap(event => event.participants),
                            countries: event
                                .flatMap(event => event.configuration)
                                .map(configuration => configuration.countries)
                        }, this.props.children);
                    }
                }

                class CompetitionApplicationProvider extends React.Component {
                    render() {
                        const event = application
                            .flatMap(getEvent(this.props.params.eventId));

                        const configuration = event
                            .flatMap(event => event.configuration);

                        return React.createElement(CompetitionView, {
                            key: 'view',
                            params: this.props.params,
                            participants: event
                                .flatMap(event => event.participants),
                            heats: event
                                .flatMap(event => event.heats),
                            penaltyTypes: configuration
                                .map(configuration => configuration.penalties),
                            heatCount: configuration
                                .map(configuration => configuration.heatCount)
                        }, this.props.children);
                    }
                }

                class ResultsApplicationProvider extends React.Component {
                    render() {
                        const event = application
                            .flatMap(getEvent(this.props.params.eventId));

                        return React.createElement(ResultsView, {
                            key: 'view',
                            params: this.props.params,
                            participants: event
                                .flatMap(event => event.participants),
                            heats: event
                                .flatMap(event => event.heats),
                            penaltyTypes: event
                                .flatMap(event => event.configuration)
                                .map(configuration => configuration.penalties)
                        }, this.props.children);
                    }
                }

                const history = History.createHashHistory();

                history.listen(location => {
                    ga('send', {
                        hitType: 'pageview',
                        page: `${location.pathname}${location.search}`
                    });
                });

                React.render(React.createElement(Main, {key: 'main', history: history}, [
                    React.createElement(ReactRouter.Router, {key: 'router'}, [
                        React.createElement(ReactRouter.Route, {
                            key: 'page',
                            path: '/',
                            component: PageApplicationProvider
                        }, [
                            React.createElement(ReactRouter.IndexRoute, {
                                key: 'index-route',
                                component: EventsApplicationProvider
                            }),

                            React.createElement(ReactRouter.Route, {
                                key: 'event-route',
                                path: 'event/:eventId',
                                component: EventApplicationProvider
                            }, [
                                React.createElement(ReactRouter.IndexRoute, {
                                    key: 'event-index-route',
                                    component: RegistrationApplicationProvider
                                }),
                                React.createElement(ReactRouter.Route, {
                                    key: 'event-configuration-route',
                                    path: 'configuration',
                                    component: ConfigurationApplicationProvider
                                }),
                                React.createElement(ReactRouter.Route, {
                                    key: 'event-registration-route',
                                    path: 'registration',
                                    component: RegistrationApplicationProvider
                                }),
                                React.createElement(ReactRouter.Route, {
                                    key: 'event-competition-route',
                                    path: 'competition(/:participantId)',
                                    component: CompetitionApplicationProvider
                                }),
                                React.createElement(ReactRouter.Route, {
                                    key: 'event-results-route',
                                    path: 'results',
                                    component: ResultsApplicationProvider
                                })
                            ])
                        ])
                    ])
                ]), document.getElementById('root'));
            };

            const store = Shuttle.ref(Application.empty());
            const application = store.flatMap(R.identity);

            bootstrapStorage(store, application)
                .then(() => console.log('Data loaded from storage'))
                .catch(e => console.error('Data DID NOT load from storage', e));

            bootstrapReact(application);

            window.R = R;
            window.s = Shuttle;
            window.m = moment;
            window.clear = () => storage.setContents('application-data', "{}");
        }
    );
});


