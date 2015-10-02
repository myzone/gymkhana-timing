define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react'], (React, ReactBootstrap, R, Shuttle, ShuttleReact) => {
    class EventView extends Shuttle.React.Component {
        render() {
            const DOM = React.DOM;

            return DOM.div({key: 'event-root'}, [
                React.createElement(ReactBootstrap.PageHeader, {key: 'header'}, DOM.span({
                    style: {
                        opacity: this.state.name ? 1 : .4
                    }
                }, this.state.name || "Empty event name")),

                DOM.div({key: 'children'}, this.props.children)
            ]);
        }
    }

    return EventView;
});
