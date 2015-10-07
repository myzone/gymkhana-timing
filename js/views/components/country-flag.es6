define(['react', 'react-bootstrap', 'jquery', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'datetime-picker', 'utils/commons'], (React, ReactBootstrap, $, R, Shuttle, ShuttleReact, moment, DateTimePicker, Commons) => {
    class CountryFlagView extends React.Component {

        render() {
            const DOM = React.DOM;

            return React.createElement(ReactBootstrap.OverlayTrigger, {
                placement: 'top',
                delayShow: 750,
                overlay: React.createElement(ReactBootstrap.Tooltip, {}, this.props.country.countryName)
            }, React.createElement('center', {style: {marginTop: '-2px'}}, [
                DOM.div({
                    key: 'image',
                    className: 'country-flag',
                    style: {
                        backgroundImage: `url(./resources/flags/${R.toLower(this.props.country.countryCode)}.svg)`
                    }
                },
                DOM.div({className: 'country-flag-label'}, this.props.country.countryCode))
            ]))
        }

    }

    return CountryFlagView;
});
