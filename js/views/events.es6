define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'views/delete'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment, DeleteView) => {
    class Link2EventView extends Shuttle.React.Component {

        constructor(params) {
            super(params);

            this.opened = Shuttle.ref(false);
        }

        render() {
            return React.createElement(ReactBootstrap.ListGroupItem, {}, [
                React.DOM.a({
                    href: `#/event/${this.state.id}`,
                    style: {
                        opacity: this.state.name ? 1 : .4,
                    }
                }, this.state.name || "Empty event name"),
                React.createElement(ReactBootstrap.Button, {
                    className: 'pull-right',
                    bsSize: 'xsmall',
                    onClick: () => this.opened.set(true)
                }, React.createElement(ReactBootstrap.Glyphicon, {key: 'glyph', glyph: 'trash'})),
                React.createElement(DeleteView, {
                    opened: this.opened,
                    eventName: this.state.name,
                    eventId: this.state.id,
                    application: this.props.application
                })
            ]);
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

            return React.createElement(ReactBootstrap.Panel, {header: React.DOM.h4({}, "Events", R.isEmpty(events) && React.DOM.small({style: {opacity: .4}}, ' (empty list)'))}, [
                React.createElement(ReactBootstrap.ListGroup, {key: 'events-list', fill: true}, [
                    R.map(event => React.createElement(Link2EventView, {
                        key: event.id.get(),
                        id: event.id,
                        name: event.name,
                        application: this.props.application
                    }), events)
                ])
            ]);
        }
    }

    return EventsView;
});
