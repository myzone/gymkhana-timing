define(['shuttle', 'ramda', 'react'], function (Shuttle, R, React) {
    class ShuttleReactComponent extends React.Component {

        constructor(props) {
            super(props);

            this.state = this.computeState(this.props);
        }

        componentDidMount() {
            var updateListener = this.updateListener.bind(this);

            R.forEach((shuttleProp) => {
                shuttleProp.value.addListener(updateListener);
            }, this.getShuttleProps(this.props));
        }

        componentWillUnmount() {
            var updateListener = this.updateListener.bind(this);

            R.forEach((shuttleProp) => {
                shuttleProp.value.removeListener(updateListener);
            }, this.getShuttleProps(this.props));
        }

        getShuttleProps(props) {
            return R.filter((prop) => {
                return prop.value instanceof Shuttle.Ref;
            }, R.map((key) => {
                return {
                    key: key,
                    value: this.props[key]
                };
            }, Object.keys(props)))
        }

        updateListener(_1, _2) {
            this.setState(this.computeState(this.props));
        }

        componentWillReceiveProps() {
            this.updateListener();
        }

        computeState(props) {
            return R.reduce((object, prop) => {
                object[prop.key] = prop.value.get();

                return object;
            }, {}, this.getShuttleProps(props));
        }

        shouldComponentUpdate(nextProps, nextState) {
            var computedState = this.computeState(nextProps);

            //return !R.reduce(R.and, true, R.map((key) {
            //        return R.eqDeep(computedState[key], this.state ? this.state[key] : null);
            //    }.bind(this), Object.keys(computedState))) || R.eq(nextState, this.state);

            return !R.eqDeep(this.computeState(nextProps), this.state);
        }
    }
    ;

    // publish
    Shuttle.React = {
        Component: ShuttleReactComponent
    };

    return 'use Shuttle.React.Component';
});