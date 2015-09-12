define(['react', 'react-bootstrap', 'ramda'], (React, ReactBootstrap, R) => {
    class Page extends React.Component {
        render() {
            const DOM = React.DOM;

            const navigation = this.props.navigation;
            const content = this.props.content;

            return DOM.div({className: 'container'}, DOM.div({className: 'row'}, [
                React.createElement(ReactBootstrap.Navbar, {
                    brand: "Gymkhana timing",
                    inverse: true
                }, React.createElement(ReactBootstrap.Nav, {
                    right: true
                }, R.map((navigationItem) => {
                    return React.createElement(ReactBootstrap.NavItem, {}, navigationItem);
                }, navigation))),
                content
            ]));
        }
    }

    return Page;
});
