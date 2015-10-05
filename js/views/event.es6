define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react'], (React, ReactBootstrap, R, Shuttle, ShuttleReact) => {
    class EventView extends Shuttle.React.Component {
        render() {
            const DOM = React.DOM;

            const configuration = this.state.configuration;

            const name = configuration.name;
            const eventDate = configuration.eventDate ? configuration.eventDate.format('Do MMM YYYY') : '';
            const eventPlace = !configuration.eventPlace ? '' : configuration.eventDate ? `, ${configuration.eventPlace}` : configuration.eventPlace;

            return DOM.div({key: 'event-root'}, [
                React.createElement(ReactBootstrap.PageHeader, {key: 'header'}, DOM.span({
                    style: {
                        opacity: name ? 1 : .4
                    }
                }, name || "Empty event name", React.DOM.small({}, ` @${eventDate}${eventPlace}`))),

                DOM.div({key: 'children'}, this.props.children)
            ]);
        }
    }

    return EventView;
});
