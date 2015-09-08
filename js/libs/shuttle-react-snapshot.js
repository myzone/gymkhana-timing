define(['shuttle', 'ramda'], function (Shuttle, R) {
    var ShuttleReactMixin = {
        getInitialState: function () {
            return this.computeState(this.props);
        },
        componentDidMount: function () {
            var updateListener = this.updateListener;

            R.forEach(function (shuttleProp) {
                shuttleProp.value.addListener(updateListener);
            }, this.getShuttleProps(this.props));
        },
        componentWillUnmount: function () {
            var updateListener = this.updateListener;

            R.forEach(function (shuttleProp) {
                shuttleProp.value.removeListener(updateListener);
            }, this.getShuttleProps(this.props));
        },
        getShuttleProps: function (props) {
            return R.filter(function (prop) {
                return prop.value instanceof Shuttle.Ref;
            }, R.map(function (key) {
                return {
                    key: key,
                    value: this.props[key]
                };
            }.bind(this), Object.keys(props)))
        },
        updateListener: function (_, _) {
            this.setState(this.computeState(this.props));
        },
        componentWillReceiveProps: function () {
            this.updateListener();
        },
        computeState: function (props) {
            return R.reduce(function (object, prop) {
                object[prop.key] = prop.value.get();

                return object;
            }, {}, this.getShuttleProps(props));
        },
        shouldComponentUpdate: function(nextProps, nextState) {
            var computedState = this.computeState(nextProps);

            return !R.reduce(R.and, true, R.map(function (key) {
                return R.eqDeep(computedState[key], this.state ? this.state[key] : null);
            }.bind(this), Object.keys(computedState))) || R.eq(nextState, this.state);

            return !R.eqDeep(this.computeState(nextProps), this.state);
        }
    };

    // publish
    Shuttle.React = {
       Mixin: ShuttleReactMixin
    };

    return 'use Shuttle.React.Mixin'
});