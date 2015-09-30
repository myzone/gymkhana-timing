define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class ToggleCellView extends Shuttle.React.Component {

        render() {
            const renderer = this.props.renderer;
            const toggle = this.props.toggle;
            const active = this.props.active;

            return React.createElement(ReactBootstrap.Button, {
                className: this.props.className,
                style: this.props.style,
                bsStyle: active(this.state.value) ? 'info' : 'default',
                onClick: () => this.props.value.set(toggle(this.state.value))
            }, renderer(this.state.value));
        }

    }

    return ToggleCellView;
});
