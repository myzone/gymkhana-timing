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


require(['react', 'react-bootstrap', 'react-router', 'ramda', 'moment', 'jquery', 'shuttle', 'shuttle-react'], (React, ReactBootstrap, ReactRouter, R, moment, $, Shuttle, ShuttleReact) => {
    require(['views/page', 'views/events', 'views/event', 'views/configuration', 'views/registration', 'views/competition', 'views/results'], (PageView, EventsView, EventView, ConfigurationView, RegistrationView, CompetitionView, ResultsView) => {
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

        const application = Shuttle.ref({
            configuration: Shuttle.ref({}),
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
        }
        ])
    });

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

    class RegistrationApplicationProvider extends React.Component {
        render() {
            return React.createElement(RegistrationView, {
                key: 'view',
                params: this.props.params,
                participants: application
                    .flatMap(application => application.participants)
            })
        }
    }

    class CompetitionApplicationProvider extends React.Component {
        render() {
            return React.createElement(CompetitionView, {
                key: 'view',
                params: this.props.params,
                participants: application
                    .flatMap(application => application.participants),
                heats: application
                    .flatMap(application => application.heats)
            })
        }
    }


    React.render(React.createElement(Main, {key: 'main'}, [
        React.createElement(PageView, {key: 'page'}, [
            React.createElement(ReactRouter.Router, {key: 'router'}, [
                React.createElement(ReactRouter.Route, {key: 'index-route', path: '/', component: EventsView}),

                React.createElement(ReactRouter.Route, {
                    key: 'event-route',
                    path: 'event/:eventId',
                    component: EventView
                }, [
                    React.createElement(ReactRouter.IndexRoute, {
                        key: 'event-index-route',
                        component: ConfigurationView
                    }),
                    React.createElement(ReactRouter.Route, {
                        key: 'event-configuration-route',
                        path: 'configuration',
                        component: ConfigurationView
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
                        component: ResultsView
                    })
                ])
            ])
        ])
    ]), document.getElementById('root'));

    window.R = R
});
})
;


