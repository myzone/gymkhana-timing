'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'models/application', 'utils/commons'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, Application, Commons) {
    var CreateView = (function (_Shuttle$React$Component) {
        _inherits(CreateView, _Shuttle$React$Component);

        function CreateView(params) {
            _classCallCheck(this, CreateView);

            _get(Object.getPrototypeOf(CreateView.prototype), 'constructor', this).call(this, params);

            this.state.name = "";
        }

        _createClass(CreateView, [{
            key: 'render',
            value: function render() {
                var _this = this;

                var DOM = React.DOM;
                var nameIsOk = this.validateName();

                return React.createElement(ReactBootstrap.Modal, {
                    show: this.props.opened,
                    onHide: function onHide() {}
                }, [React.createElement(ReactBootstrap.Panel, {
                    header: DOM.h3({}, "Create new event"),
                    bsStyle: 'primary',
                    style: { marginBottom: '0' }
                }, [DOM.form({ className: 'form-horizontal' }, [React.createElement(ReactBootstrap.Input, {
                    label: "Name",
                    autoFocus: true,
                    type: 'text',
                    labelClassName: 'col-md-1',
                    wrapperClassName: 'col-md-11',

                    bsStyle: nameIsOk ? 'success' : 'error',
                    hasFeedback: true,
                    defaultValue: this.state.name,
                    onChange: function onChange(e) {
                        return _this.setState({ name: e.target.value });
                    }
                })]), React.createElement(ReactBootstrap.ButtonGroup, { className: 'pull-right' }, [React.createElement(ReactBootstrap.Button, {
                    bsStyle: nameIsOk ? 'primary' : 'submit',
                    disabled: !nameIsOk,
                    style: { opacity: '1' },
                    onClick: function onClick() {
                        var eventId = Commons.guid();
                        var name = _this.state.name;

                        _this.props.application.set(R.assoc(eventId, Application.emptyEvent(eventId, name), _this.state.application));

                        window.location.hash = '#/';
                    }
                }, "Create"), React.createElement(ReactBootstrap.Button, { onClick: function onClick() {
                        Commons.setQueryParams(R.dissoc('modal', Commons.getQueryParams()));
                    } }, "Cancel")])])]);
            }
        }, {
            key: 'validateName',
            value: function validateName() {
                return !R.isEmpty(this.state.name);
            }
        }]);

        return CreateView;
    })(Shuttle.React.Component);

    return CreateView;
});

//# sourceMappingURL=create.js.map