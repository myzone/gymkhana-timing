define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class ImportView extends Shuttle.React.Component {

        constructor(params) {
            super(params);

            this.state.name = "";
        }

        render() {
            const DOM = React.DOM;

            return React.createElement(ReactBootstrap.Modal, {
                bsSize: "large",
                show: this.props.opened
            }, [
                React.createElement(ReactBootstrap.Panel, {
                    header: DOM.h3({}, "Import"),
                    bsStyle: 'primary',
                    style: {marginBottom: '0'}
                }, [
                    React.DOM.textarea({
                        style: {
                            width: '100%',
                            height: '70vh'
                        }
                    }),
                    React.createElement(ReactBootstrap.ButtonGroup, {className: 'pull-right'}, [
                        React.createElement(ReactBootstrap.Button, {
                            style: {opacity: '1'},
                            onClick: () => {

                                window.location.hash = `#/`;
                            }
                        }, "Import"),
                        React.createElement(ReactBootstrap.Button, {onClick: () => {
                            Commons.setQueryParams(R.dissoc('modal', Commons.getQueryParams()))
                        }}, "Cancel")
                    ])
                ])
            ]);
        }
    }

    return ImportView;
});
