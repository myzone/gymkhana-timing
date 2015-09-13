define(['react', 'react-bootstrap'], (React, ReactBootstrap) => {
    class ConfigurationView extends React.Component {
        render() {
            const DOM = React.DOM;

            const eventId = this.props.params.eventId;

            return DOM.div({}, [
                React.createElement(ReactBootstrap.Pager, {}, [
                    React.createElement(ReactBootstrap.PageItem, {href: `#event/${eventId}/configuration`}, "Configuration"),
                    React.createElement(ReactBootstrap.PageItem, {next: true, href: `#event/${eventId}/registration`}, [
                        "Registration", ' ', React.createElement(ReactBootstrap.Glyphicon, {glyph: 'menu-right'})
                    ])
                ]),

                "Configuration"
            ]);
        }
    }

    return ConfigurationView;
});
