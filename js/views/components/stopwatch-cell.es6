define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, Commons) => {
    class StopwatchCellView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            return React.createElement(ReactBootstrap.OverlayTrigger, {
                key: 'cell-overlay',
                trigger: 'click',
                placement: 'top',
                overlay: React.createElement(ReactBootstrap.Popover, {key: 'cell-popover'}, [
                    React.createElement(ReactBootstrap.ListGroup, {style: {marginBottom: '5px'}}, [
                        React.createElement(ReactBootstrap.ListGroupItem, {className: 'col-md-12'}, React.createElement('center', {}, "1:12.12")),
                        React.createElement(ReactBootstrap.ListGroupItem, {
                            className: 'col-md-12',
                            onClick: () => "10"
                        }, "Start")
                    ])
                ])
            }, React.DOM.span({key: 'cell-value', className: 'date-cell'}, "123"));
        }

    }

    return StopwatchCellView;
});
