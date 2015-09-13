require.config({
    paths: {
        'ramda': 'libs/ramda-0.13.min',
        'jquery': 'libs/jquery-2.1.3',
        'moment': 'libs/moment-with-locales-2.10.2',

        'react': 'libs/react-0.13.1',
        'react-bootstrap': 'libs/react-bootstrap-0.20.3',
        'react-router': 'libs/react-router-1.0.0-rc1',

        'shuttle': 'libs/shuttle-snapshot',
        'shuttle-react': 'libs/shuttle-react-snapshot',

        'photoswipe': 'libs/photoswipe-4.1.0',
        'photoswipe-ui': 'libs/photoswipe-ui-default-4.1.0',

        'unslider': 'libs/unslider-1.0.0',
        'justified': 'libs/jquery.justified-1.0.0',
        'parallax': 'libs/parallax-2.1.3',

        'models/local-storage': 'models/application',

        'views/page': 'views/page',
        'views/events': 'views/events',
        'views/event': 'views/event',
        'views/registration': 'views/registration',
        'views/competition': 'views/competition',
        'views/results': 'views/results'
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


require(['react', 'react-bootstrap', 'react-router', 'ramda', 'jquery', 'shuttle', 'shuttle-react'], (React, ReactBootstrap, ReactRouter, R, $, Shuttle, ShuttleReact) => {
    require(['models/application', 'views/page', 'views/events', 'views/event', 'views/configuration', 'views/registration', 'views/competition', 'views/results'], (LocalStorage, PageView, EventsView, EventView, ConfigurationView, RegistrationView, CompetitionView, ResultsView) => {
        const Main = React.createClass({
            mixins: [Shuttle.React.Mixin],
            render: function () {
                var DOM = React.DOM;

                return DOM.div({}, [
                    R.mapIndexed((stylesheet, i) => {
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

        React.render(React.createElement(Main, {}, [
            React.createElement(PageView, {}, [
                React.createElement(ReactRouter.Router, {}, [
                    React.createElement(ReactRouter.Route, {path: '/', component: EventsView}),

                    React.createElement(ReactRouter.Route, {path: 'event/:eventId', component: EventView}, [
                        React.createElement(ReactRouter.IndexRoute, {component: ConfigurationView}),
                        React.createElement(ReactRouter.Route, {path: 'configuration', component: ConfigurationView}),
                        React.createElement(ReactRouter.Route, {path: 'registration', component: RegistrationView}),
                        React.createElement(ReactRouter.Route, {path: 'competition', component: CompetitionView}),
                        React.createElement(ReactRouter.Route, {path: 'results', component: ResultsView})
                    ])
                ])
            ])
        ]), document.getElementById('root'));
    });
});


