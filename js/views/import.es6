define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'models/application', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Application, Commons) => {
    class ImportView extends Shuttle.React.Component {

        constructor(params) {
            super(params);

            this.state.showOverlay = null;
            this.state.raw = "";
        }

        render() {
            const DOM = React.DOM;
            const raw = this.state.raw;

            return React.createElement(ReactBootstrap.Modal, {
                bsSize: "large",
                show: this.props.opened,
                onHide: () => {
                }
            }, [
                React.createElement(ReactBootstrap.Panel, {
                    header: DOM.h3({}, "Are you ABSOLUTELY sure?"),
                    bsStyle: 'warning',
                    style: {marginBottom: '0'}
                }, [
                    React.createElement(ReactBootstrap.Collapse, {in: this.state.showOverlay == 'success'}, React.createElement(ReactBootstrap.Alert, {
                        onDismiss: () => this.setState({showOverlay: null})
                    }, "Data have been imported successfully.")),

                    DOM.p({}, [
                        "This action ",
                        DOM.b({}, "CANNOT"),
                        " be undone. This may permanently replace the some your data."
                    ]),

                    DOM.p({}, [
                        "Carefully paste your dump into form below and press import"
                    ]),

                    DOM.textarea({
                        autoFocus: true,
                        className: 'data-text-area',
                        onChange: e => this.setState({raw: e.target.value})
                    }),

                    DOM.br(),

                    React.createElement(ReactBootstrap.ButtonGroup, {className: 'pull-right'}, [
                        React.createElement(ReactBootstrap.Button, {
                            style: {opacity: '1'},
                            bsStyle: 'warning',
                            disabled: !raw || !Application.validate(raw),
                            onClick: () => {
                                const imported = Application.unmashall(raw).get();

                                this.props.application.set(R.merge(this.state.application, imported));

                                this.setState({showOverlay: 'success'})
                            }
                        }, "Import"),
                        React.createElement(ReactBootstrap.Button, {
                            onClick: () => {
                                this.setState({showOverlay: null});
                                Commons.setQueryParams(R.dissoc('modal', Commons.getQueryParams()))
                            }
                        }, "Cancel")
                    ])
                ])
            ]);
        }
    }

    return ImportView;
});
