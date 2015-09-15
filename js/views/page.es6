define(['react', 'react-bootstrap', 'ramda'], (React, ReactBootstrap, R) => {
    class Page extends React.Component {
        render() {
            const DOM = React.DOM;

            return DOM.div({key: 'container', className: 'container'}, DOM.div({key: 'row', className: 'row'}, [
                React.createElement(ReactBootstrap.Navbar, {
                    key: 'navigation-bar',
                    brand: "Gymkhana timing",
                    inverse: true
                }, React.createElement(ReactBootstrap.Nav, {key: 'navigation-bar-inner', right: true}, [
                    React.createElement(ReactBootstrap.NavItem, {key: 'new'}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'file'}), ' New'),
                    React.createElement(ReactBootstrap.NavItem, {key: 'import'}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'import'}), ' Import'),
                    React.createElement(ReactBootstrap.NavItem, {key: 'export'}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'export'}), ' Export')
                ])),

                this.props.children
            ]));
        }
    }

    return Page;
});
