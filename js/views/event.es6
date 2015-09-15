define(['react', 'react-bootstrap'], (React, ReactBootstrap) => {
    class EventView extends React.Component {
        render() {
            const DOM = React.DOM;

            return DOM.div({key: 'event-root'}, [
                React.createElement(ReactBootstrap.PageHeader, {key: 'header'}, "Championship of Ukraine 2015"),

                DOM.div({key: 'children'}, this.props.children)
            ]);
        }
    }

    return EventView;
});
