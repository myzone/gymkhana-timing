define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class SelectCellView extends Shuttle.React.Component {

        render() {
            const renderer = this.props.renderer;
            const overlay = React.createElement(ReactBootstrap.Popover, {
                key: 'cell-popover'
            }, [
                React.DOM.div({className: 'with-scroll', style: {maxHeight: '240px', marginBottom: '5px'}}, React.createElement(ReactBootstrap.ListGroup, {key: 'cell-list'}, [
                    R.addIndex(R.map)((item, i) => React.createElement(ReactBootstrap.ListGroupItem, {
                        key: i,
                        bsStyle: R.equals(this.state.value, item) ? 'info' : 'default',
                        onClick: () => this.props.value.set(item)
                    }, renderer(item)), this.props.items)
                ]))
            ]);

            return React.createElement(ReactBootstrap.OverlayTrigger, {
                key: 'cell-overlay',
                trigger: 'click',
                rootClose: true,
                placement: 'bottom',
                overlay: overlay
            }, React.DOM.div({}, [renderer(this.state.value), React.DOM.span({className: 'caret'})]));
        }

    }

    return SelectCellView;
});
