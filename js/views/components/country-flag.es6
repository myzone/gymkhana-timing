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
                    style: {
                        background: `url(http://www.geonames.org/flags/m/${R.toLower(this.props.country.countryCode)}.png) center`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'auto 100%',

                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '5px',
                        paddingBottom: '5px'
                    }
                },
                DOM.div({
                    style: {
                        transform: 'scale(2, 2)',
                        WebkitTransform: 'scale(2, 2)',
                        MozTransform: 'scale(2, 2)',
                        OTransform: 'scale(2, 2)',
                        msTransform: 'scale(2, 2)',

                        fontWeight: '100',
                        color: 'black',
                        textShadow: '0.5px 0.5px 0.5px rgba(255, 255, 255, 0.65), -0.5px -0.5px 0.5px rgba(255, 255, 255, 0.65), 0.5px 0.5px 0.5px rgba(255, 255, 255, 0.45), -0.5px 0.5px 0.5px rgba(255, 255, 255, 0.65)'
                    }
                }, this.props.country.countryCode))
            ]))
        }

    }

    return CountryFlagView;
});
