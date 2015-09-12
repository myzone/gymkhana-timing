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

        'views/switcher': 'views/switcher',

        'views/page': 'views/page',
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

require(['react', 'react-bootstrap', 'react-router', 'ramda', 'jquery', 'shuttle', 'shuttle-react'], function (React, ReactBootstrap, ReactRouter, R, $, Shuttle, ShuttleReact) {
    require(['views/page', 'views/configuration', 'views/registration', 'views/competition', 'views/results'], function (PageView, ConfigurationView, RegistrationView, CompetitionView, ResultsView) {
        var application = Shuttle.ref({});

        var navigation = [{
            label: React.DOM.span({}, React.createElement(ReactBootstrap.Glyphicon, { glyph: 'file' }), ' New'),
            handler: function handler() {}
        }, {
            label: React.DOM.span({}, React.createElement(ReactBootstrap.Glyphicon, { glyph: 'import' }), ' Import'),
            handler: function handler() {}
        }, {
            label: React.DOM.span({}, React.createElement(ReactBootstrap.Glyphicon, { glyph: 'export' }), ' Export'),
            handler: function handler() {}
        }];

        var Main = React.createClass({
            displayName: 'Main',

            mixins: [Shuttle.React.Mixin],
            render: function render() {
                var _this = this;

                var DOM = React.DOM;

                return DOM.div({}, [R.mapIndexed(function (stylesheet, i) {
                    return DOM.link({ key: i, rel: 'stylesheet', href: stylesheet });
                }, ['css/style.css', 'css/bootstrap.css', 'css/photoswipe.css', 'css/photoswipe-default-skin.css', 'css/jquery.justified.css', 'css/vis.min.css', 'css/c3.css', 'css/timeline.css']), React.createElement(PageView, {
                    key: 'main-page',
                    navigation: navigation,
                    content: DOM.div({}, [DOM.div({}, [React.createElement(ReactBootstrap.PageHeader, {}, "Championship of Ukraine 2015"), React.createElement(ReactBootstrap.Pager, {}, [React.createElement(ReactBootstrap.PageItem, {
                        previous: true,
                        onClick: function onClick() {
                            router.transitionTo('registration', {
                                eventId: _this.props.getParams().eventId
                            });
                        }
                    }, [React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-left' }), ' ', "Registration"]), React.createElement(ReactBootstrap.PageItem, { href: "" }, "Competition"), React.createElement(ReactBootstrap.PageItem, {
                        next: true,
                        disabled: true,
                        onClick: function onClick() {
                            router.transitionTo('results', {
                                eventId: _this.props.getParams().eventId
                            });
                        }
                    }, ["Results", ' ', React.createElement(ReactBootstrap.Glyphicon, { glyph: 'menu-right' })])]), DOM.h1({}, 'ConfigurationView'), React.createElement(ConfigurationView, {}), DOM.h1({}, 'RegistrationView'), React.createElement(RegistrationView, {}), DOM.h1({}, 'CompetitionView'), React.createElement(CompetitionView, {}), DOM.h1({}, 'ResultsView'), React.createElement(ResultsView, {})])])
                })]);
            }
        });

        React.render(React.createElement(Main, {
            application: application
        }), document.getElementById('root'));
    });
});

//# sourceMappingURL=app.js.map