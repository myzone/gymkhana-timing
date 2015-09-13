define(['react', 'react-bootstrap'], (React, ReactBootstrap) => {
    class EventView extends React.Component {
        render() {
            const DOM = React.DOM;

            return DOM.div({}, [
                React.createElement(ReactBootstrap.PageHeader, {}, "Championship of Ukraine 2015"),

                this.props.children
            ]);
        }
    }

    return EventView;
});
