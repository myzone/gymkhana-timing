define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'views/delete'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment, DeleteView) => {
    class Link2EventView extends Shuttle.React.Component {

        constructor(params) {
            super(params);

            this.opened = Shuttle.ref(false);
        }

        render() {
            const name = this.state.name;
            const eventDate = this.state.eventDate ? this.state.eventDate.format('Do MMM YYYY') : '';
            const eventPlace = !this.state.eventPlace ? '' : this.state.eventDate ? `, ${this.state.eventPlace}` : this.state.eventPlace;

            return React.createElement(ReactBootstrap.ListGroupItem, {}, [
                React.DOM.a({
                    href: `#/event/${this.state.id}`,
                    style: {
                        opacity: name ? 1 : .4,
                    }
                }, name || "Empty event name"),
                React.DOM.small({style: {color: 'darkgray'}}, ` @${eventDate}${eventPlace}`),
                React.createElement(ReactBootstrap.Button, {
                    className: 'pull-right',
                    bsSize: 'xsmall',
                    onClick: () => this.opened.set(true)
                }, React.createElement(ReactBootstrap.Glyphicon, {key: 'glyph', glyph: 'trash'})),
                React.createElement(DeleteView, {
                    opened: this.opened,
                    eventName: name,
                    eventId: this.state.id,
                    application: this.props.application
                })
            ]);
        }
    }

    class EventsView extends Shuttle.React.Component {
        render() {
            const events = R.map(event => {
                const configuration = event
                    .flatMap(e => e.configuration);

                return {
                    id: event
                        .map(event => event.id),
                    name: configuration
                        .map(c => c.name),
                    eventDate: configuration
                        .map(c => c.eventDate),
                    eventPlace: configuration
                        .map(c => c.eventPlace)
                }
            }, this.state.events);

            return React.createElement(ReactBootstrap.Panel, {header: React.DOM.h4({}, "Events", R.isEmpty(events) && React.DOM.small({style: {opacity: .4}}, ' (empty list)'))}, [
                React.createElement(ReactBootstrap.ListGroup, {key: 'events-list', fill: true}, [
                    R.map(event => React.createElement(Link2EventView, {
                        key: event.id.get(),
                        id: event.id,
                        name: event.name,
                        eventDate: event.eventDate,
                        eventPlace: event.eventPlace,
                        application: this.props.application
                    }), events)
                ])
            ]);
        }
    }

    return EventsView;
});
