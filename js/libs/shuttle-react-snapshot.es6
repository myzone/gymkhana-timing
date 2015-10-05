define(['shuttle', 'ramda', 'react'], function (Shuttle, R, React) {
    class ShuttleReactComponent extends React.Component {

        updateListener;

        constructor(props) {
            super(props);

            this.updateListener = (a, b) => {
                return this.setState(this.computeState(this.props, this.state))
            };
            this.state = this.computeState(this.props, {});
        }

        componentDidMount() {
            R.forEach(shuttleProp => shuttleProp.value.addListener(this.updateListener), this.getShuttleProps(this.props));
        }

        componentWillUnmount() {
            R.forEach(shuttleProp => shuttleProp.value.removeListener(this.updateListener), this.getShuttleProps(this.props));
        }

        shouldComponentUpdate(nextProps, nextState) {
            return true;//!R.equals(this.state, this.computeState(nextProps, nextState))
        }

        componentWillReceiveProps(props) {
            this.setState(this.computeState(props, this.state));
        }

        componentDidUpdate(prevProps, prevState) {
            const getShuttlePropsIds = R.compose(
                R.map(prop => prop.value.guid),
                this.getShuttleProps
            );

            if (!R.equals(getShuttlePropsIds(prevProps), getShuttlePropsIds(this.props))) {
                R.forEach(shuttleProp => shuttleProp.value.removeListener(this.updateListener), this.getShuttleProps(prevProps));
                R.forEach(shuttleProp => shuttleProp.value.addListener(this.updateListener), this.getShuttleProps(this.props));
            }
        }

        computeState(props, state) {
            return R.reduce((object, prop) => R.assoc(prop.key, prop.value.get(), object), state, this.getShuttleProps(props));
        }

        getShuttleProps(props) {
            return R.filter(prop => prop.value instanceof Shuttle.Ref, R.map(key => R.identity({
                key: key,
                value: props[key]
            }), Object.keys(props)))
        }

    }

    // publish
    Shuttle.React = {
        Component: ShuttleReactComponent
    };

    return 'use Shuttle.React.Component';
});