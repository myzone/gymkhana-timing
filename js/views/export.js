'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) {
    var ExportView = (function (_Shuttle$React$Component) {
        _inherits(ExportView, _Shuttle$React$Component);

        function ExportView(params) {
            _classCallCheck(this, ExportView);

            _get(Object.getPrototypeOf(ExportView.prototype), 'constructor', this).call(this, params);

            this.state.select = function () {};
            this.state.showOverlay = null;
        }

        _createClass(ExportView, [{
            key: 'render',
            value: function render() {
                var _this = this;

                var DOM = React.DOM;
                var data = JSON.stringify(Shuttle.json(this.props.application), null, 3);

                return React.createElement(ReactBootstrap.Modal, {
                    bsSize: "large",
                    show: this.props.opened,
                    onHide: function onHide() {}
                }, [React.createElement(ReactBootstrap.Panel, {
                    header: DOM.h3({}, "Export"),
                    bsStyle: 'success',
                    style: { marginBottom: '0' }
                }, [this.state.showOverlay == 'success' && React.createElement(ReactBootstrap.Alert, {
                    onDismiss: function onDismiss() {
                        return _this.setState({ showOverlay: null });
                    }
                }, "Data have been copied to clipboard"), DOM.textarea({
                    ref: 'input',
                    readOnly: true,
                    style: {
                        display: 'block',

                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                        wordWrap: 'break-word',

                        backgroundColor: '#f5f5f5',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        resize: 'none',
                        outline: 'none',

                        width: '100%',
                        height: '70vh',
                        overflow: 'auto'
                    }
                }, data), DOM.br(), React.createElement(ReactBootstrap.ButtonGroup, { className: 'pull-right' }, [React.createElement(ReactBootstrap.Button, { onClick: this.state.select }, [this.state.showOverlay == 'failure' && React.createElement(ReactBootstrap.Tooltip, {
                    className: 'in',
                    style: { marginLeft: '-200%' },
                    placement: 'left'
                }, "Press CMD+C to copy"), React.createElement(ReactBootstrap.Glyphicon, { glyph: 'copy' }), ' ', "Copy"]), React.createElement(ReactBootstrap.Button, {
                    onClick: function onClick() {
                        Commons.setQueryParams(R.dissoc('modal', Commons.getQueryParams()));
                    }
                }, "Cancel")])])]);
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                _get(Object.getPrototypeOf(ExportView.prototype), 'componentDidMount', this).call(this);

                var input = React.findDOMNode(this.refs.input);
                var select = function select() {
                    input.select();

                    try {
                        if (!document.queryCommandSupported("copy")) throw 'unsupported';

                        document.execCommand('copy');
                        _this2.setState({ showOverlay: 'success' });
                    } catch (_) {
                        _this2.setState({ showOverlay: 'failure' });
                    }
                };

                this.setState({ select: select });
            }
        }]);

        return ExportView;
    })(Shuttle.React.Component);

    return ExportView;
});

//# sourceMappingURL=export.js.map