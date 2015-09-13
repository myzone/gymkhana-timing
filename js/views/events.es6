define(['react', 'react-bootstrap'], (React, ReactBootstrap) => {
    class EventsView extends React.Component {
        render() {
            const DOM = React.DOM;

            return React.createElement(ReactBootstrap.ListGroup, {}, [
                React.createElement(ReactBootstrap.ListGroupItem, {href: '#/event/asd1'}, "Championship of Ukraine 2013"),
                React.createElement(ReactBootstrap.ListGroupItem, {href: '#/event/asd2'}, "Championship of Ukraine 2014"),
                React.createElement(ReactBootstrap.ListGroupItem, {href: '#/event/asd3'}, "Championship of Ukraine 2015")
            ])
        }
    }

    return EventsView;
});
