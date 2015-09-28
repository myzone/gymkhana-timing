define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class CreateView extends Shuttle.React.Component {

        constructor(params) {
            super(params);

            this.state.nameCopy = "";
        }

        render() {
            const DOM = React.DOM;
            const nameCopyIsOk = this.validateNameCopy();

            return React.createElement(ReactBootstrap.Modal, {show: this.state.opened}, [
                React.createElement(ReactBootstrap.Panel, {
                    header: DOM.h3({}, "Are you ABSOLUTELY sure?"),
                    bsStyle: 'danger',
                    style: {marginBottom: '0'}
                }, [
                    DOM.form({className: 'form-horizontal'}, [
                        DOM.p({}, [
                            "This action ",
                            DOM.b({}, "CANNOT"),
                            " be undone. This will permanently delete the ",
                            DOM.b({}, this.props.eventName),
                            " event."
                        ]),
                        DOM.p(),
                        DOM.p({}, "Please type in the name of the event to confirm."),
                        React.createElement(ReactBootstrap.Input, {
                            type: 'text',

                            wrapperClassName: 'col-md-12',

                            bsStyle: nameCopyIsOk ? 'warning' : 'error',
                            hasFeedback: true,
                            defaultValue: "",
                            onChange: (e) => this.setState({nameCopy: e.target.value})
                        })
                    ]),
                    React.createElement(ReactBootstrap.ButtonGroup, {className: 'pull-right'}, [
                        React.createElement(ReactBootstrap.Button, {
                            bsStyle: nameCopyIsOk ? 'danger' : 'warning',
                            disabled: !nameCopyIsOk,
                            style: {opacity: '1'},
                            onClick: () => {
                                this.props.application.set(R.dissoc(this.props.eventId, this.state.application));

                                this.props.opened.set(false);
                                window.location.hash = '#/';
                            }
                        }, "I understand the consequences, delete the event"),
                        React.createElement(ReactBootstrap.Button, {onClick: () => {
                            this.props.opened.set(false);
                        }}, "Cancel")
                    ])
                ])
            ]);
        }

        validateNameCopy() {
            return this.props.eventName == this.state.nameCopy
        }

    }

    return CreateView;
});
