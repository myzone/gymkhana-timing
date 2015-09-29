define(['react', 'react-bootstrap', 'jquery', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'datetime-picker', 'utils/commons'], (React, ReactBootstrap, $, R, Shuttle, ShuttleReact, moment, DateTimePicker, Commons) => {
    class DateTimePickerView extends React.Component {
        componentDidMount() {
            $(React.findDOMNode(this.refs.container))
                .datetimepicker({
                    inline: true,
                    viewMode: 'years',
                    format: 'DD/MM/YYYY',
                    locale: moment.locale()
                })
                .on('dp.change', (e) => this.props.onChange(e.date));
        }

        render() {
            return React.DOM.div({ref: 'container', style: {overflow: 'hidden'}});
        }
    }


    class DateCellView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            const value = this.state.value.format('Do MMM YYYY');

            return React.createElement(ReactBootstrap.OverlayTrigger, {
                ref: 'popover',
                key: 'cell-overlay',
                trigger: 'click',
                rootClose: true,
                placement: 'bottom',
                overlay: React.createElement(ReactBootstrap.Popover, {key: 'cell-popover'}, [
                    React.createElement(DateTimePickerView, {
                        key: 'cell-input',
                        ref: 'input',
                        type: "date",
                        defaultValue: value,
                        onChange: (value) => {
                            this.props.value.set(value);

                            this.refs.popover.hide()
                        }
                    })
                ])
            }, React.DOM.span({key: 'cell-value', className: 'date-cell'}, value));
        }

    }

    return DateCellView;
});
