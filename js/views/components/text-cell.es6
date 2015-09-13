define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class TextCellView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            return React.DOM.textarea({
                defaultValue: this.state.value,
                onChange: (event) => this.props.value.set(event.target.value)
            })
        }
    }

    return TextCellView;
});
