define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class SelectCellView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            const renderer = this.props.renderer;

            return React.createElement(ReactBootstrap.OverlayTrigger, {
                key: 'cell-overlay',
                trigger: 'click',
                rootClose: true,
                placement: 'top',
                overlay: React.createElement(ReactBootstrap.Popover, {
                    key: 'cell-popover',
                    className: 'with-scroll',
                    style: {height: '140px'}
                }, [
                    React.createElement(ReactBootstrap.ListGroup, {key: 'cell-list'}, [
                        R.mapIndexed((item, i) => React.createElement(ReactBootstrap.ListGroupItem, {
                            key: i,
                            bsStyle: this.state.value == item ? 'info' : 'default',
                            onClick: () => this.props.value.set(item)
                        }, renderer(item)), this.props.items)
                    ])
                ])
            }, renderer(this.state.value));
        }

    }

    return SelectCellView;
});