'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'models/application', 'utils/commons'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, Application, Commons) {
    var ImportView = (function (_Shuttle$React$Component) {
        _inherits(ImportView, _Shuttle$React$Component);

        function ImportView(params) {
            _classCallCheck(this, ImportView);

            _get(Object.getPrototypeOf(ImportView.prototype), 'constructor', this).call(this, params);

            this.state.showOverlay = null;
            this.state.raw = "";
        }

        _createClass(ImportView, [{
            key: 'render',
            value: function render() {
                var _this = this;

                var DOM = React.DOM;
                var raw = this.state.raw;

                return React.createElement(ReactBootstrap.Modal, {
                    bsSize: "large",
                    dialogClassName: 'data-modal',
                    show: this.props.opened,
                    onHide: function onHide() {}
                }, [React.createElement(ReactBootstrap.Panel, {
                    header: DOM.h3({}, "Are you ABSOLUTELY sure?"),
                    bsStyle: 'warning',
                    style: { marginBottom: '0' }
                }, [React.createElement(ReactBootstrap.Collapse, { 'in': this.state.showOverlay == 'success' }, React.createElement(ReactBootstrap.Alert, {
                    onDismiss: function onDismiss() {
                        return _this.setState({ showOverlay: null });
                    }
                }, "Data have been imported successfully.")), DOM.p({}, ["This action ", DOM.b({}, "CANNOT"), " be undone. This may permanently replace the some your data."]), DOM.p({}, ["Carefully paste your dump into form below and press import"]), DOM.textarea({
                    autoFocus: true,
                    className: 'data-text-area',
                    onChange: function onChange(e) {
                        return _this.setState({ raw: e.target.value });
                    }
                }), DOM.br(), React.createElement(ReactBootstrap.ButtonGroup, { className: 'pull-right' }, [React.createElement(ReactBootstrap.Button, {
                    style: { opacity: '1' },
                    bsStyle: 'warning',
                    disabled: !raw || !Application.validate(raw),
                    onClick: function onClick() {
                        var imported = Application.unmashall(raw).get();

                        _this.props.application.set(R.merge(_this.state.application, imported));

                        _this.setState({ showOverlay: 'success' });
                    }
                }, "Import"), React.createElement(ReactBootstrap.Button, {
                    onClick: function onClick() {
                        _this.setState({ showOverlay: null });
                        Commons.setQueryParams(R.dissoc('modal', Commons.getQueryParams()));
                    }
                }, "Cancel")])])]);
            }
        }]);

        return ImportView;
    })(Shuttle.React.Component);

    return ImportView;
});

//# sourceMappingURL=import.js.map