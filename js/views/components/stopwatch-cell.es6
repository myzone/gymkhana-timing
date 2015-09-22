define(['react', 'react-bootstrap', 'react-input-mask', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'moment-durations', 'utils/commons'], (React, ReactBootstrap, InputElement, R, Shuttle, ShuttleReact, moment, momentDurations, Commons) => {
    class StopwatchCellView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            const duration = this.state.value;

            return React.createElement(InputElement, {
                mask: '99:99.999',
                className: this.props.className,
                style: this.props.style,
                defaultValue: duration ? duration.format('mm:ss.SSS', {trim: false}) : '__:__.___',
                onChange: (event) => {
                    const val = event.target.value;

                    const res1 = R.split(':', val);
                    const res2 = res1[1] ? R.split('.', res1[1]) : ['0', '0'];

                    const replace_With0 = R.replace(/_/g, '0');
                    const duration = moment.duration({
                        m: replace_With0(res1[0]),
                        s: replace_With0(res2[0]),
                        ms: replace_With0(res2[1])
                    });
                    this.props.value.set(duration.asMilliseconds() != 0
                        ? duration
                        : null)
                }
            });
        }

    }

    return StopwatchCellView;
});
