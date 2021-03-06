define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class TextCellView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            return React.DOM.textarea({
                key: 'cell-textarea',
                value: this.state.value,
                className: this.props.className,
                style: this.props.style,
                maxLength: this.props.maxLength,
                onChange: event => this.props.value.set(R.replace(/\n/g, '', event.target.value))
            })
        }

    }

    return TextCellView;
});
