'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) {
    var CreateView = (function (_Shuttle$React$Component) {
        _inherits(CreateView, _Shuttle$React$Component);

        function CreateView(params) {
            _classCallCheck(this, CreateView);

            _get(Object.getPrototypeOf(CreateView.prototype), 'constructor', this).call(this, params);

            this.state.nameCopy = "";
        }

        _createClass(CreateView, [{
            key: 'render',
            value: function render() {
                var _this = this;

                var DOM = React.DOM;
                var nameCopyIsOk = this.validateNameCopy();

                return React.createElement(ReactBootstrap.Modal, { show: this.state.opened }, [React.createElement(ReactBootstrap.Panel, {
                    header: DOM.h3({}, "Are you ABSOLUTELY sure?"),
                    bsStyle: 'danger',
                    style: { marginBottom: '0' }
                }, [DOM.form({ className: 'form-horizontal' }, [DOM.p({}, ["This action ", DOM.b({}, "CANNOT"), " be undone. This will permanently delete the ", DOM.b({}, this.props.eventName), " event."]), DOM.p(), DOM.p({}, "Please type in the name of the event to confirm."), React.createElement(ReactBootstrap.Input, {
                    type: 'text',

                    wrapperClassName: 'col-md-12',

                    bsStyle: nameCopyIsOk ? 'warning' : 'error',
                    hasFeedback: true,
                    defaultValue: "",
                    autoFocus: true,
                    onChange: function onChange(e) {
                        return _this.setState({ nameCopy: e.target.value });
                    }
                })]), React.createElement(ReactBootstrap.ButtonGroup, { className: 'pull-right' }, [React.createElement(ReactBootstrap.Button, {
                    bsStyle: nameCopyIsOk ? 'danger' : 'warning',
                    disabled: !nameCopyIsOk,
                    style: { opacity: '1' },
                    onClick: function onClick() {
                        _this.props.application.set(R.dissoc(_this.props.eventId, _this.state.application));

                        _this.props.opened.set(false);
                        window.location.hash = '#/';
                    }
                }, "I understand the consequences, delete the event"), React.createElement(ReactBootstrap.Button, { onClick: function onClick() {
                        _this.props.opened.set(false);
                    } }, "Cancel")])])]);
            }
        }, {
            key: 'validateNameCopy',
            value: function validateNameCopy() {
                return this.props.eventName == this.state.nameCopy;
            }
        }]);

        return CreateView;
    })(Shuttle.React.Component);

    return CreateView;
});

//# sourceMappingURL=delete.js.map