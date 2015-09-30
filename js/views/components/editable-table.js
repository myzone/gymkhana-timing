'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'components/text-cell', 'components/date-cell', 'components/select-cell', 'utils/commons'], function (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment, TextCellView, DateCellView, SelectCellView, Commons) {
    var EditableTableRowView = (function (_React$Component) {
        _inherits(EditableTableRowView, _React$Component);

        function EditableTableRowView(props) {
            var _this = this;

            _classCallCheck(this, EditableTableRowView);

            _get(Object.getPrototypeOf(EditableTableRowView.prototype), 'constructor', this).call(this, props);

            this.listener = function (_, item) {
                return _this.props.item.set(item);
            };
            this.itemProxy = Shuttle.ref(this.props.item.get());
        }

        _createClass(EditableTableRowView, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.itemProxy.addListener(this.listener);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.itemProxy.removeListener(this.listener);
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(this.props.renderer, R.merge({
                    item: this.itemProxy,
                    deleteButton: React.createElement(ReactBootstrap.Button, {
                        key: 'button',
                        disabled: this.props.last,
                        bsSize: 'xsmall',
                        onClick: this.props.onDelete
                    }, React.createElement(ReactBootstrap.Glyphicon, { key: 'glyph', glyph: 'trash' })),
                    last: this.props.last
                }, this.props.rendererProps));
            }
        }]);

        return EditableTableRowView;
    })(React.Component);

    var EditableTableView = (function (_Shuttle$React$Component) {
        _inherits(EditableTableView, _Shuttle$React$Component);

        function EditableTableView(props) {
            var _this2 = this;

            _classCallCheck(this, EditableTableView);

            _get(Object.getPrototypeOf(EditableTableView.prototype), 'constructor', this).call(this, props);

            var generateLast = function generateLast() {
                _this2.last = _this2.props.generateNextDefault();
                _this2.last.addListener(_this2.listener);
            };

            this.listener = function (_, item) {
                if (!_this2.props.isEmpty(item)) {
                    var last = _this2.last;

                    last.removeListener(_this2.listener);

                    _this2.props.items.set(R.append(last, _this2.props.items.get()));

                    generateLast();
                }
            };

            generateLast();
        }

        _createClass(EditableTableView, [{
            key: 'render',
            value: function render() {
                var _this3 = this;

                var DOM = React.DOM;

                return React.createElement(ReactBootstrap.Table, {
                    key: 'table',
                    className: 'data-editable',
                    responsive: true,
                    hover: true,
                    striped: true
                }, [DOM.thead({ key: 'table-head' }, React.createElement(this.props.headerRenderer, {})), DOM.tbody({ key: 'table-body' }, [R.flatten([R.map(function (item) {
                    return React.createElement(EditableTableRowView, {
                        key: _this3.props.getId(item.get()),
                        item: item,
                        renderer: _this3.props.itemRenderer,
                        rendererProps: _this3.props.props,
                        onDelete: function onDelete() {
                            _this3.props.items.set(R.filter(function (i) {
                                return i.get().id !== item.get().id;
                            }, _this3.state.items));
                        }
                    });
                }, this.state.items), React.createElement(EditableTableRowView, {
                    key: this.props.getId(this.last.get()),
                    item: this.last,
                    renderer: this.props.itemRenderer,
                    rendererProps: this.props.props,
                    last: true,
                    onDelete: function onDelete() {}
                })])]), DOM.tfoot({ key: 'table-foot' }, React.createElement(this.props.footerRenderer, {}))]);
            }
        }]);

        return EditableTableView;
    })(Shuttle.React.Component);

    return EditableTableView;
});

//# sourceMappingURL=editable-table.js.map