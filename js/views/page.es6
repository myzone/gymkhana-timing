define(['react', 'react-bootstrap', 'ramda', 'utils/commons', 'views/create'], (React, ReactBootstrap, R, Commons, CreateView) => {
    const setModal = (modal) => {
        const setQueryParam = (param, value) => {
            Commons.setQueryParams(R.assoc(param, value, Commons.getQueryParams()))
        };

        setQueryParam('modal', modal);
    };

    const Modal = {
        NEW: "new",
        EXPORT: "import",
        IMPORT: "export"
    };

    class Page extends React.Component {
        render() {
            const DOM = React.DOM;
            const modal = this.props.location.query.modal;

            return DOM.div({key: 'container', className: 'container'}, DOM.div({key: 'row', className: 'row'}, [
                React.createElement(ReactBootstrap.Navbar, {
                    key: 'navigation-bar',
                    brand: DOM.a({href: '#/'}, "Gymkhana timing"),
                    inverse: true
                }, React.createElement(ReactBootstrap.Nav, {key: 'navigation-bar-inner', right: true}, [
                    React.createElement(ReactBootstrap.NavItem, {
                        key: 'new',
                        onClick: () => setModal(Modal.NEW)
                    }, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'file'}), ' New'),
                    React.createElement(ReactBootstrap.NavItem, {
                        key: 'import',
                        onClick: () => setModal(Modal.IMPORT)
                    }, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'import'}), ' Import'),
                    React.createElement(ReactBootstrap.NavItem, {
                        key: 'export',
                        onClick: () => setModal(Modal.EXPORT)
                    }, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'export'}), ' Export')
                ])),

                React.createElement(CreateView, {
                    application: this.props.application,
                    opened: modal == Modal.NEW
                }),

                this.props.children
            ]));
        }
    }

    return Page;
});
