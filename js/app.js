'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require.config({
    paths: {
        'ramda': 'libs/ramda-0.13.min',
        'jquery': 'libs/jquery-2.1.3',
        'moment': 'libs/moment-with-locales-2.10.2',

        'react': 'libs/react-0.13.1',
        'react-bootstrap': 'libs/react-bootstrap-0.25.2',
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
        'views/results': 'views/results',

        'components/text-cell': 'views/components/text-cell',
        'components/date-cell': 'views/components/date-cell',

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

require(['react', 'react-bootstrap', 'react-router', 'ramda', 'jquery', 'shuttle', 'shuttle-react'], function (React, ReactBootstrap, ReactRouter, R, $, Shuttle, ShuttleReact) {
    require(['models/application', 'views/page', 'views/events', 'views/event', 'views/configuration', 'views/registration', 'views/competition', 'views/results'], function (LocalStorage, PageView, EventsView, EventView, ConfigurationView, RegistrationView, CompetitionView, ResultsView) {
        var application = Shuttle.ref({
            participants: Shuttle.ref([Shuttle.ref({
                id: 2,
                number: "43",
                country: "il",
                name: "Vyacheslavzaza11 Goldenshteyn1",
                motorcycle: "Honda FMX 650",
                group: "Group 3B",
                birthday: "2015-09-01",
                team: "Sommmmm Team"
            }), Shuttle.ref({
                id: 3,
                number: "43",
                country: "il",
                name: "Vyacheslav Goldenshteyn1",
                motorcycle: "Honda FMX 650",
                group: "Group 3B",
                birthday: "2015-09-01",
                team: "Sommmmm Team"
            })])
        });
        var Main = React.createClass({
            displayName: 'Main',

            mixins: [Shuttle.React.Mixin],
            render: function render() {
                var DOM = React.DOM;

                return DOM.div({}, [R.mapIndexed(function (stylesheet, i) {
                    return DOM.link({ key: i, rel: 'stylesheet', href: stylesheet });
                }, ['css/style.css', 'css/bootstrap.css', 'css/photoswipe.css', 'css/photoswipe-default-skin.css', 'css/jquery.justified.css', 'css/vis.min.css', 'css/c3.css', 'css/timeline.css']), this.props.children]);
            }
        });

        var ApplicationRegistrationProvider = (function (_React$Component) {
            _inherits(ApplicationRegistrationProvider, _React$Component);

            function ApplicationRegistrationProvider() {
                _classCallCheck(this, ApplicationRegistrationProvider);

                _get(Object.getPrototypeOf(ApplicationRegistrationProvider.prototype), 'constructor', this).apply(this, arguments);
            }

            _createClass(ApplicationRegistrationProvider, [{
                key: 'render',
                value: function render() {
                    return React.createElement(RegistrationView, {
                        params: this.props.params,
                        participants: application.flatMap(function (application) {
                            return application.participants;
                        })
                    });
                }
            }]);

            return ApplicationRegistrationProvider;
        })(React.Component);

        React.render(React.createElement(Main, {}, [React.createElement(PageView, {}, [React.createElement(ReactRouter.Router, {}, [React.createElement(ReactRouter.Route, { path: '/', component: EventsView }), React.createElement(ReactRouter.Route, { path: 'event/:eventId', component: EventView }, [React.createElement(ReactRouter.IndexRoute, { component: ConfigurationView }), React.createElement(ReactRouter.Route, { path: 'configuration', component: ConfigurationView }), React.createElement(ReactRouter.Route, {
            path: 'registration',
            component: ApplicationRegistrationProvider
        }), React.createElement(ReactRouter.Route, { path: 'competition', component: CompetitionView }), React.createElement(ReactRouter.Route, { path: 'results', component: ResultsView })])])])]), document.getElementById('root'));
    });
});

//# sourceMappingURL=app.js.map