define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'models/application', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Application, Commons) => {
    const prettify = (json) => JSON.stringify(JSON.parse(json), null, 3);

    class ExportView extends Shuttle.React.Component {

        render() {
            const data = prettify(Application.marshall(this.props.application));

            class ExportDialog extends React.Component {

                constructor(params) {
                    super(params);

                    this.state = {
                        input: null,
                        showOverlay: null
                    };
                }

                render() {
                    const DOM = React.DOM;
                    const copy = () => {
                        this.state.input.select();

                        try {
                            if (!document.queryCommandSupported("copy"))
                                throw 'unsupported';

                            document.execCommand('copy');
                            this.setState({showOverlay: 'success'});

                            document.getSelection().empty();
                        } catch (_) {
                            this.setState({showOverlay: 'failure'});
                        }
                    };

                    return React.createElement(ReactBootstrap.Modal.Dialog, {bsSize: "large"}, React.createElement(ReactBootstrap.Panel, {
                        header: DOM.h3({}, "Export"),
                        bsStyle: 'success',
                        style: {marginBottom: '0'}
                    }, [
                        React.createElement(ReactBootstrap.Collapse, {in: this.state.showOverlay == 'success'}, React.createElement(ReactBootstrap.Alert, {
                            onDismiss: () => this.setState({showOverlay: null})
                        }, "Data have been copied to clipboard.")),

                        DOM.p({}, [
                            "Please keep your dump in safe to make import process safe and painless."
                        ]),

                        DOM.textarea({
                            ref: 'input',
                            readOnly: true,
                            className: 'data-text-area'
                        }, data),

                        DOM.br(),

                        React.createElement(ReactBootstrap.ButtonGroup, {className: 'pull-right'}, [
                            React.createElement(ReactBootstrap.Button, {onClick: copy}, [
                                this.state.showOverlay == 'failure' && React.createElement(ReactBootstrap.Tooltip, {
                                    className: 'in',
                                    style: {marginLeft: '-200%'},
                                    placement: 'left'
                                }, "Press CMD+C to copy"),
                                React.createElement(ReactBootstrap.Glyphicon, {glyph: 'copy'}),
                                ' ',
                                "Copy"
                            ]),
                            React.createElement(ReactBootstrap.Button, {
                                onClick: () => {
                                    Commons.setQueryParams(R.dissoc('modal', Commons.getQueryParams()))
                                }
                            }, "Cancel")
                        ])
                    ]));
                }

                componentDidMount() {
                    this.setState({input: React.findDOMNode(this.refs.input)});
                }

                componentWillUnmount() {
                    this.setState({input: null});
                }

            }


            return React.createElement(ReactBootstrap.Modal, {
                show: this.props.opened,
                dialogComponent: ExportDialog,
                onHide: () => {}
            });
        }

    }

    return ExportView;
});
