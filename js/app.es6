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
        'views/create': 'views/create',
        'views/delete': 'views/delete',

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


require(['react', 'react-bootstrap', 'react-router', 'ramda', 'moment', 'jquery', 'shuttle', 'shuttle-react'], (React, ReactBootstrap, ReactRouter, R, moment, $, Shuttle, ShuttleReact) => {
    require(['views/page', 'views/events', 'views/event', 'views/configuration', 'views/registration', 'views/competition', 'views/results', 'views/create'], (PageView, EventsView, EventView, ConfigurationView, RegistrationView, CompetitionView, ResultsView, CreateView) => {
            const exampleApplication = () => {
                const myzone = Shuttle.ref({
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
                                    delay: moment.duration({seconds: 1})
                                }, {
                                    name: '+1',
                                    type: 'critical',
                                    delay: moment.duration({seconds: 1})
                                }]
                            }
                        }])
                    })
                });
            };

            const loadApplication = () => {
                const savedData = JSON.parse(localStorage.getItem('application-data'));

                let application = R.mapObj(event => {
                    return {
                        id: event.id,
                        configuration: Shuttle.ref({
                            name: event.configuration.name
                        }),
                        participants: Shuttle.ref(R.map(participant => Shuttle.ref({
                            id: participant.id,
                            number: participant.number,
                            country: participant.country,
                            name: participant.name,
                            motorcycle: participant.motorcycle,
                            group: participant.group,
                            birthday: participant.birthday,
                            team: participant.team
                        }), event.participants)),
                        heats: R.map(heat => {
                            return {
                                id: heat.id,
                                participant: heat.participant,
                                number: heat.number,
                                result: {
                                    type: heat.result.type,
                                    time: heat.result.time ? moment.duration(heat.result.time) : undefined,
                                    penalties: heat.result.penalties ? R.map(penalty => {
                                        return {
                                            name: penalty.name,
                                            type: penalty.type,
                                            delay: moment.duration(penalty.delay)
                                        };
                                    }, heat.result.penalties) : undefined
                                }
                            };
                        }, event.heats)
                    }
                }, savedData);

                application = R.mapObj(event => {
                    event.heats = Shuttle.ref(R.map(heat => {
                        heat.participant = R.find((participant) => R.equals(participant.get(), heat.participant), event.participants.get());

                        return heat;
                    }, event.heats));

                    return Shuttle.ref(event);
                }, application);

                return Shuttle.ref(application);
            };

            //const application = exampleApplication();
            const application = loadApplication();
            setInterval(() => {
                localStorage.setItem('application-data', JSON.stringify(Shuttle.json(application)));
            }, 1000);


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

            class EventApplicationProvider extends React.Component {
                render() {
                    const event = application
                        .flatMap(application => application[this.props.params.eventId]);

                    return React.createElement(EventView, {
                        key: 'view',
                        params: this.props.params,
                        name: event
                            .flatMap(event => event.configuration)
                            .map(configuration => configuration.name),
                        application: application
                    }, this.props.children);
                }
            }

            class RegistrationApplicationProvider extends React.Component {
                render() {
                    const event = application
                        .flatMap(application => application[this.props.params.eventId]);

                    return React.createElement(RegistrationView, {
                        key: 'view',
                        params: this.props.params,
                        participants: event
                            .flatMap(event => event.participants)
                    }, this.props.children);
                }
            }

            class CompetitionApplicationProvider extends React.Component {
                render() {
                    const event = application
                        .flatMap(application => application[this.props.params.eventId]);

                    return React.createElement(CompetitionView, {
                        key: 'view',
                        params: this.props.params,
                        participants: event
                            .flatMap(event => event.participants),
                        heats: event
                            .flatMap(event => event.heats)
                    }, this.props.children);
                }
            }

            class ResultsApplicationProvider extends React.Component {
                render() {
                    const event = application
                        .flatMap(application => application[this.props.params.eventId]);

                    return React.createElement(ResultsView, {
                        key: 'view',
                        params: this.props.params,
                        participants: event
                            .flatMap(event => event.participants),
                        heats: event
                            .flatMap(event => event.heats)
                    }, this.props.children);
                }
            }

            React.render(React.createElement(Main, {key: 'main'}, [
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
                            //React.createElement(ReactRouter.Route, {
                            //    key: 'event-configuration-route',
                            //    path: 'configuration',
                            //    component: ConfigurationView
                            //}),
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

            window.R = R;
            window.s = Shuttle;
            window.m = moment;
        }
    )
    ;
})
;


