define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class DateCellView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        //this.props.value.set(event.target.value);

        render() {
            return React.createElement(ReactBootstrap.OverlayTrigger, {
                trigger: 'click',
                rootClose: 'true',
                placement: 'top',
                overlay: React.createElement(ReactBootstrap.Popover, {}, [
                    React.DOM.form({}, [
                        React.createElement(ReactBootstrap.Input, {
                            ref: 'input',
                            type: "date",
                            defaultValue: this.state.value,
                            onChange: (event) => this.props.value.set(event.target.value)
                        })
                    ])
                ])
            }, React.DOM.span({className: 'date-cell'}, this.state.value));
        }
    }

    return DateCellView;
});
