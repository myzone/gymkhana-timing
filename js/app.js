'use strict';

require.config({
    paths: {
        'ramda': 'libs/ramda-0.13.min',
        'jquery': 'libs/jquery-2.1.3',

        'react': 'libs/react-0.13.1',
        'react-bootstrap': 'libs/react-bootstrap-0.20.3',
        'react-router': 'libs/react-router-0.13.3',

        'shuttle': 'libs/shuttle-snapshot',
        'shuttle-react': 'libs/shuttle-react-snapshot',

        'photoswipe': 'libs/photoswipe-4.1.0',
        'photoswipe-ui': 'libs/photoswipe-ui-default-4.1.0',

        'unslider': 'libs/unslider-1.0.0',
        'justified': 'libs/jquery.justified-1.0.0',
        'parallax': 'libs/parallax-2.1.3',

        'views/page': 'views/page'
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

require(['react', 'react-bootstrap', 'react-router', 'ramda', 'jquery', 'shuttle', 'shuttle-react', 'views/page'], function (React, ReactBootstrap, ReactRouter, R, $, Shuttle, ShuttleReact, Page) {
    var application = Shuttle.ref({});

    var asd = React.createClass({
        displayName: 'asd',

        render: function render() {
            return React.DOM.div({}, "asd");
        }
    });
    var routes = [React.createElement(ReactRouter.DefaultRoute, {
        name: 'default',
        handler: asd
    }), React.createElement(ReactRouter.Route, {
        name: 'home',
        path: 'home',
        handler: asd
    }), React.createElement(ReactRouter.Route, {
        name: 'gallery',
        path: 'gallery',
        handler: asd
    }), React.createElement(ReactRouter.Route, {
        name: 'about',
        path: 'about',
        handler: asd
    })];
    var navigation = [
        //{
        //    label: React.DOM.span({}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'home'}), ' Home'),
        //    handler: function () {
        //        router.transitionTo('home');
        //    }
        //}, {
        //    label: React.DOM.span({}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'th'}), ' Gallery'),
        //    handler: function () {
        //        router.transitionTo('gallery');
        //    }
        //}, {
        //    label: React.DOM.span({}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'info-sign'}), ' About'),
        //    handler: function () {
        //        router.transitionTo('about');
        //    }
        //}
    ];

    var router = ReactRouter.create();
    router.addRoutes(routes);

    var Switcher = React.createClass({
        displayName: 'Switcher',

        getInitialState: function getInitialState() {
            return {
                Handler: React.createClass({
                    displayName: 'Handler',

                    render: function render() {
                        return React.DOM.div({ key: 'none' });
                    }
                })
            };
        },
        componentDidMount: function componentDidMount() {
            undefined.props.router.run(function (Handler, state) {
                undefined.setState({
                    Handler: Handler
                });
            });
        },
        render: function render() {
            return React.createElement(this.state.Handler, {
                application: this.props.application,
                params: this.props.router.getCurrentParams(),
                query: this.props.router.getCurrentQuery()
            });
        }
    });

    var Main = React.createClass({
        displayName: 'Main',

        mixins: [Shuttle.React.Mixin],
        render: function render() {
            var DOM = React.DOM;

            return DOM.div({}, [R.mapIndexed(function (stylesheet, i) {
                return DOM.link({ key: i, rel: 'stylesheet', href: stylesheet });
            }, ['css/style.css', 'css/bootstrap.css', 'css/photoswipe.css', 'css/photoswipe-default-skin.css', 'css/jquery.justified.css', 'css/vis.min.css', 'css/c3.css', 'css/timeline.css']), React.createElement(Page, {
                key: 'main-page',
                navigation: navigation,
                content: asd || React.createElement(Switcher, {
                    application: this.props.application,
                    router: router
                })
            })]);
        }
    });

    React.render(React.createElement(Main, {
        application: application
    }), document.getElementById('root'));
});

//# sourceMappingURL=app.js.map