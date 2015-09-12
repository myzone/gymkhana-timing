define(['react'], (React) => {
    class Switcher extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                Handler: React.createClass({
                    render: () => {
                        return React.DOM.div({key: 'none'})
                    }
                })
            };
        }
        componentDidMount() {
            this.props.router.run((Handler, state) => {
                this.setState({
                    Handler: Handler,
                    state: state
                });
            });
        }
        render() {
            return React.createElement(this.state.Handler, {
                application: this.props.application,
                getParams: () => this.props.router.getCurrentParams(),
                getQuery: () =>this.props.router.getCurrentQuery()
            })
        }
    }

    return Switcher;
});
