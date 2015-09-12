define(['react', 'react-bootstrap'], (React, ReactBootstrap) => {
    class ConfigurationView extends React.Component {
        render() {
            const DOM = React.DOM;

            return DOM.div({}, "Configuration");
        }
    }

    return ConfigurationView;
});
