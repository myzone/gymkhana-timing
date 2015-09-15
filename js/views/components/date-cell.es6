define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class DateCellView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            return React.createElement(ReactBootstrap.OverlayTrigger, {
                key: 'cell-overlay',
                trigger: 'click',
                rootClose: true,
                placement: 'top',
                overlay: React.createElement(ReactBootstrap.Popover, {key: 'cell-popover'}, [
                    React.createElement(ReactBootstrap.Input, {
                        key: 'cell-input',
                        ref: 'input',
                        type: "date",
                        defaultValue: this.state.value,
                        onChange: (event) => this.props.value.set(event.target.value)
                    })
                ])
            }, React.DOM.span({key: 'cell-value', className: 'date-cell'}, this.state.value));
        }

    }

    return DateCellView;
});
