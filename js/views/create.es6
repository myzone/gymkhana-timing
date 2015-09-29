define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class CreateView extends Shuttle.React.Component {

        constructor(params) {
            super(params);

            this.state.name = "";
        }

        render() {
            const DOM = React.DOM;
            const nameIsOk = this.validateName();

            return React.createElement(ReactBootstrap.Modal, {
                show: this.props.opened
            }, [
                React.createElement(ReactBootstrap.Panel, {
                    header: DOM.h3({}, "Create new event"),
                    bsStyle: 'primary',
                    style: {marginBottom: '0'}
                }, [
                    DOM.form({className: 'form-horizontal'}, [
                        React.createElement(ReactBootstrap.Input, {
                            label: "Name",

                            type: 'text',
                            labelClassName: 'col-md-1',
                            wrapperClassName: 'col-md-11',

                            bsStyle: nameIsOk ? 'success' : 'error',
                            hasFeedback: true,
                            defaultValue: this.state.name,
                            onChange: (e) => this.setState({name: e.target.value})
                        })
                    ]),
                    React.createElement(ReactBootstrap.ButtonGroup, {className: 'pull-right'}, [
                        React.createElement(ReactBootstrap.Button, {
                            bsStyle: nameIsOk ? 'primary' : 'submit',
                            disabled: !nameIsOk,
                            style: {opacity: '1'},
                            onClick: () => {
                                const eventId = Commons.guid();

                                const application = Shuttle.ref({
                                        id: eventId,
                                        configuration: Shuttle.ref({
                                            name: this.state.name,
                                            penalties: {},
                                            countries: []
                                        }),
                                        participants: Shuttle.ref([]),
                                        heats: Shuttle.ref([])
                                });
                                this.props.application.set(R.assoc(eventId, application, this.state.application));

                                window.location.hash = `#/`;
                            }
                        }, "Create"),
                        React.createElement(ReactBootstrap.Button, {onClick: () => {
                            Commons.setQueryParams(R.dissoc('modal', Commons.getQueryParams()))
                        }}, "Cancel")
                    ])
                ])
            ]);
        }

        validateName() {
            return !R.isEmpty(this.state.name);
        }

    }

    return CreateView;
});
