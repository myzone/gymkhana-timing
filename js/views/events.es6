define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment) => {
    class Link2EventView extends Shuttle.React.Component {
        render() {
            return React.createElement(ReactBootstrap.ListGroupItem, {
                key: '0',
                href: `#/event/${this.state.id}`
            }, this.state.name)
        }
    }

    class EventsView extends Shuttle.React.Component {
        render() {
            const events = R.map(event => {
                return {
                    id: event
                        .map(event => event.id),
                    name: event
                        .flatMap(e => e.configuration)
                        .map(c => c.name)
                }
            }, this.state.events);

            return React.createElement(ReactBootstrap.ListGroup, {key: 'events-list'}, [
                R.map(event => React.createElement(Link2EventView, {
                    key: event.id.get(),
                    id: event.id,
                    name: event.name
                }), events)
            ]);
        }
    }

    return EventsView;
});
