'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-bootstrap', 'ramda', 'utils/commons', 'views/create', 'views/import', 'views/export'], function (React, ReactBootstrap, R, Commons, CreateView, ImportView, ExportView) {
    var setModal = function setModal(modal) {
        var setQueryParam = function setQueryParam(param, value) {
            Commons.setQueryParams(R.assoc(param, value, Commons.getQueryParams()));
        };

        setQueryParam('modal', modal);
    };

    var Modal = {
        NEW: "new",
        EXPORT: "export",
        IMPORT: "import"
    };

    var Page = (function (_React$Component) {
        _inherits(Page, _React$Component);

        function Page() {
            _classCallCheck(this, Page);

            _get(Object.getPrototypeOf(Page.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(Page, [{
            key: 'render',
            value: function render() {
                var DOM = React.DOM;
                var modal = this.props.location.query.modal;

                return DOM.div({ key: 'container', className: 'container' }, DOM.div({ key: 'row', className: 'row' }, [React.createElement(ReactBootstrap.Navbar, {
                    key: 'navigation-bar',
                    inverse: true,
                    toggleNavKey: 0
                }, [React.createElement(ReactBootstrap.NavBrand, {}, DOM.a({ href: '#/' }, "Gymkhana timing")), React.createElement(ReactBootstrap.Nav, { key: 'navigation-bar-inner', eventKey: 0, right: true }, [React.createElement(ReactBootstrap.NavItem, {
                    key: 'new',
                    onClick: function onClick() {
                        return setModal(Modal.NEW);
                    }
                }, React.createElement(ReactBootstrap.Glyphicon, { glyph: 'file' }), ' New'), React.createElement(ReactBootstrap.NavItem, {
                    key: 'import',
                    onClick: function onClick() {
                        return setModal(Modal.IMPORT);
                    }
                }, React.createElement(ReactBootstrap.Glyphicon, { glyph: 'import' }), ' Import'), React.createElement(ReactBootstrap.NavItem, {
                    key: 'export',
                    onClick: function onClick() {
                        return setModal(Modal.EXPORT);
                    }
                }, React.createElement(ReactBootstrap.Glyphicon, { glyph: 'export' }), ' Export')])]), React.createElement(CreateView, {
                    application: this.props.application,
                    opened: modal == Modal.NEW
                }), React.createElement(ImportView, {
                    application: this.props.application,
                    opened: modal == Modal.IMPORT
                }), React.createElement(ExportView, {
                    application: this.props.application,
                    opened: modal == Modal.EXPORT
                }), this.props.children]));
            }
        }]);

        return Page;
    })(React.Component);

    return Page;
});

//# sourceMappingURL=page.js.map