'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'models/application', 'utils/commons'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, Application, Commons) {
    var prettify = function prettify(json) {
        return JSON.stringify(JSON.parse(json), null, 3);
    };

    var ExportView = (function (_Shuttle$React$Component) {
        _inherits(ExportView, _Shuttle$React$Component);

        function ExportView() {
            _classCallCheck(this, ExportView);

            _get(Object.getPrototypeOf(ExportView.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(ExportView, [{
            key: 'render',
            value: function render() {
                var data = prettify(Application.marshall(this.props.application));

                var ExportDialog = (function (_React$Component) {
                    _inherits(ExportDialog, _React$Component);

                    function ExportDialog(params) {
                        _classCallCheck(this, ExportDialog);

                        _get(Object.getPrototypeOf(ExportDialog.prototype), 'constructor', this).call(this, params);

                        this.state = {
                            input: null,
                            showOverlay: null
                        };
                    }

                    _createClass(ExportDialog, [{
                        key: 'render',
                        value: function render() {
                            var _this = this;

                            var DOM = React.DOM;
                            var copy = function copy() {
                                _this.state.input.select();

                                try {
                                    if (!document.queryCommandSupported("copy")) throw 'unsupported';

                                    document.execCommand('copy');
                                    _this.setState({ showOverlay: 'success' });

                                    document.getSelection().empty();
                                } catch (_) {
                                    _this.setState({ showOverlay: 'failure' });
                                }
                            };

                            return React.createElement(ReactBootstrap.Modal.Dialog, { bsSize: "large" }, React.createElement(ReactBootstrap.Panel, {
                                header: DOM.h3({}, "Export"),
                                bsStyle: 'success',
                                style: { marginBottom: '0' }
                            }, [React.createElement(ReactBootstrap.Collapse, { 'in': this.state.showOverlay == 'success' }, React.createElement(ReactBootstrap.Alert, {
                                onDismiss: function onDismiss() {
                                    return _this.setState({ showOverlay: null });
                                }
                            }, "Data have been copied to clipboard.")), DOM.p({}, ["Please keep your dump in safe to make import process safe and painless."]), DOM.textarea({
                                ref: 'input',
                                readOnly: true,
                                className: 'data-text-area'
                            }, data), DOM.br(), React.createElement(ReactBootstrap.ButtonGroup, { className: 'pull-right' }, [React.createElement(ReactBootstrap.Button, { onClick: copy }, [this.state.showOverlay == 'failure' && React.createElement(ReactBootstrap.Tooltip, {
                                className: 'in',
                                style: { marginLeft: '-200%' },
                                placement: 'left'
                            }, "Press CMD+C to copy"), React.createElement(ReactBootstrap.Glyphicon, { glyph: 'copy' }), ' ', "Copy"]), React.createElement(ReactBootstrap.Button, {
                                onClick: function onClick() {
                                    Commons.setQueryParams(R.dissoc('modal', Commons.getQueryParams()));
                                }
                            }, "Cancel")])]));
                        }
                    }, {
                        key: 'componentDidMount',
                        value: function componentDidMount() {
                            this.setState({ input: React.findDOMNode(this.refs.input) });
                        }
                    }, {
                        key: 'componentWillUnmount',
                        value: function componentWillUnmount() {
                            this.setState({ input: null });
                        }
                    }]);

                    return ExportDialog;
                })(React.Component);

                return React.createElement(ReactBootstrap.Modal, {
                    show: this.props.opened,
                    dialogComponent: ExportDialog,
                    onHide: function onHide() {}
                });
            }
        }]);

        return ExportView;
    })(Shuttle.React.Component);

    return ExportView;
});

//# sourceMappingURL=export.js.map