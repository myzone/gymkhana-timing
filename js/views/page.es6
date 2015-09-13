define(['react', 'react-bootstrap', 'ramda'], (React, ReactBootstrap, R) => {
    class Page extends React.Component {
        render() {
            const DOM = React.DOM;

            return DOM.div({className: 'container'}, DOM.div({className: 'row'}, [
                React.createElement(ReactBootstrap.Navbar, {brand: "Gymkhana timing", inverse: true}, React.createElement(ReactBootstrap.Nav, {right: true}, [
                    React.createElement(ReactBootstrap.NavItem, {}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'file'}), ' New'),
                    React.createElement(ReactBootstrap.NavItem, {}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'import'}), ' Import'),
                    React.createElement(ReactBootstrap.NavItem, {}, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'export'}), ' Export')
                ])),

                this.props.children
            ]));
        }
    }

    return Page;
});
