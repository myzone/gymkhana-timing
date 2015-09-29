define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class ExportView extends Shuttle.React.Component {

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
                    header: DOM.h3({}, "Export"),
                    bsStyle: 'primary',
                    style: {marginBottom: '0'}
                }, [
                    React.createElement(ReactBootstrap.Panel, {
                        style: {
                            maxHeight: '70vh',
                            overflow: 'auto'
                        }
                    }, DOM.pre({}, JSON.stringify(Shuttle.json(this.props.application), null, 2))),
                    React.createElement(ReactBootstrap.ButtonGroup, {className: 'pull-right'}, [
                        React.createElement(ReactBootstrap.Button, {
                            style: {opacity: '1'},
                            onClick: () => {

                                window.location.hash = `#/`;
                            }
                        }, "Copy"),
                        React.createElement(ReactBootstrap.Button, {onClick: () => {
                            Commons.setQueryParams(R.dissoc('modal', Commons.getQueryParams()))
                        }}, "Cancel")
                    ])
                ])
            ]);
        }
    }

    return ExportView;
});
