define(['shuttle', 'ramda', 'react'], function (Shuttle, R, React) {
    class ShuttleReactComponent extends React.Component {

        updateListener;
        lastState;

        constructor(props) {
            super(props);

            this.updateListener = (a, b) => this.setState(this.computeState(this.props, this.state));
            this.state = this.computeState(this.props, {});
            this.lastState = this.state;
        }

        componentDidMount() {
            R.forEach(shuttleProp => shuttleProp.value.addListener(this.updateListener), this.getShuttleProps(this.props));
        }

        componentWillUnmount() {
            R.forEach(shuttleProp => shuttleProp.value.removeListener(this.updateListener), this.getShuttleProps(this.props));
        }

        //shouldComponentUpdate(nextProps, nextState) {
        //    return !R.equals(nextProps, this.props)
        //        || !R.equals(this.computeState(nextProps, nextState), R.equals(this.computeState(this.props, this.lastState)));
        //}

        componentWillReceiveProps(props) {
            this.setState(this.computeState(props, this.lastState));
        }

        componentDidUpdate(prevProps, prevState) {
            this.lastState = prevState;
        }

        computeState(props, state) {
            return R.reduce((object, prop) => {
                object[prop.key] = prop.value.get();

                return object;
            }, state, this.getShuttleProps(props));
        }

        getShuttleProps(props) {
            return R.filter(prop => prop.value instanceof Shuttle.Ref, R.map(key => {
                return {
                    key: key,
                    value: this.props[key]
                };
            }, Object.keys(props)))
        }

    }

    // publish
    Shuttle.React = {
        Component: ShuttleReactComponent
    };

    return 'use Shuttle.React.Component';
});