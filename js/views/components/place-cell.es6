define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class PlaceCellView extends Shuttle.React.Component {

        render() {
            return React.createElement(ReactBootstrap.Input, {
                type: 'text',
                className: this.props.className,
                groupClassName: 'no-margin',

                value: this.state.value,
                onChange: e => this.props.value.set(e.target.value)
            });
        }

    }

    return PlaceCellView;
});
