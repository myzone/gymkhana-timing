define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class ExportView extends Shuttle.React.Component {

        constructor(params) {
            super(params);

            this.state.select = () => {
            };
            this.state.showOverlay = null;
        }

        render() {
            const DOM = React.DOM;
            const data = JSON.stringify(Shuttle.json(this.props.application), null, 3);

            return React.createElement(ReactBootstrap.Modal, {
                bsSize: "large",
                show: this.props.opened,
                onHide: () => {}
            }, [
                React.createElement(ReactBootstrap.Panel, {
                    header: DOM.h3({}, "Export"),
                    bsStyle: 'success',
                    style: {marginBottom: '0'}
                }, [
                    this.state.showOverlay == 'success' && React.createElement(ReactBootstrap.Alert, {
                        onDismiss: () => this.setState({showOverlay: null})
                    }, "Data have been copied to clipboard"),
                    DOM.textarea({
                        ref: 'input',
                        readOnly: true,
                        style: {
                            display: 'block',

                            fontFamily: 'monospace',
                            wordBreak: 'break-all',
                            wordWrap: 'break-word',

                            backgroundColor: '#f5f5f5',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            resize: 'none',
                            outline: 'none',

                            width: '100%',
                            height: '70vh',
                            overflow: 'auto'
                        }
                    }, data),
                    DOM.br(),
                    React.createElement(ReactBootstrap.ButtonGroup, {className: 'pull-right'}, [
                        React.createElement(ReactBootstrap.Button, {onClick: this.state.select}, [
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
                ])
            ]);
        }

        componentDidMount() {
            super.componentDidMount();

            const input = React.findDOMNode(this.refs.input);
            const select = () => {
                input.select();

                try {
                    if (!document.queryCommandSupported("copy"))
                        throw 'unsupported';

                    document.execCommand('copy');
                    this.setState({showOverlay: 'success'});
                } catch (_) {
                    this.setState({showOverlay: 'failure'});
                }


            };


            this.setState({select: select})
        }

    }

    return ExportView;
});
