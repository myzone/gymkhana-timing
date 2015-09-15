define(['react', 'react-bootstrap'], (React, ReactBootstrap) => {
    class EventsView extends React.Component {
        render() {
            return React.createElement(ReactBootstrap.ListGroup, {key: 'events-list'}, [
                React.createElement(ReactBootstrap.ListGroupItem, {key: '0', href: '#/event/asd1'}, "Championship of Ukraine 2013"),
                React.createElement(ReactBootstrap.ListGroupItem, {key: '1', href: '#/event/asd2'}, "Championship of Ukraine 2014"),
                React.createElement(ReactBootstrap.ListGroupItem, {key: '2', href: '#/event/asd3'}, "Championship of Ukraine 2015")
            ])
        }
    }

    return EventsView;
});
