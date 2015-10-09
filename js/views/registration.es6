define(['react', 'react-bootstrap', 'ramda', 'shuttle', 'shuttle-react', 'moment', 'components/editable-table', 'components/text-cell', 'components/date-cell', 'components/select-cell', 'components/country-flag', 'utils/commons'], (React, ReactBootstrap, R, Shuttle, ShuttleReact, moment, EditableTableView, TextCellView, DateCellView, SelectCellView, CountryFlagView, Commons) => {
    class ParticipantHeaderRenderer extends React.Component {

        render() {
            const DOM = React.DOM;

            return DOM.tr({key: 'head-row'}, [
                DOM.td({key: 'id-header'}, ""),
                DOM.td({key: 'number-header'}, "#"),
                DOM.th({key: 'country-header'}, "Country"),
                DOM.th({key: 'name-header'}, "Name"),
                DOM.th({key: 'motorcycle-header'}, "Motorcycle"),
                DOM.th({key: 'birthday-header'}, "Birthday")
            ]);
        }

    }

    class ParticipantFooterRenderer extends React.Component {

        render() {
            return React.DOM.tr({key: 'foot-row'});
        }

    }

    class ParticipantRenderer extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            const DOM = React.DOM;

            const participant = this.state.item;
            const validationStatus = !R.isEmpty(participant.number)
                && !R.isEmpty(participant.country)
                && !R.isEmpty(participant.name)
                && !R.isEmpty(participant.motorcycle);

            const number = Shuttle.ref(participant.number);
            const country = Shuttle.ref(participant.country);
            const name = Shuttle.ref(participant.name);
            const motorcycle = Shuttle.ref(participant.motorcycle);
            const birthday = Shuttle.ref(participant.birthday);

            Shuttle
                .combine([number, country, name, motorcycle, birthday], (number, country, name, motorcycle, birthday) => {
                    return {
                        id: participant.id,
                        number: number,
                        country: country,
                        name: name,
                        motorcycle: motorcycle,
                        birthday: birthday
                    }
                })
                .addListener((_, computed) => this.props.item.set(computed));

            return DOM.tr({
                key: 'row',
                className: this.props.last ? "" : validationStatus ? 'list-group-item-success' : 'list-group-item-danger'
            }, [
                DOM.td({key: 'trash', style: {width: '24px'}}, this.props.deleteButton),

                DOM.td({key: 'number', style: {width: '50px'}}, React.createElement(TextCellView, {
                    key: 'number-cell',
                    className: 'race-number without-scroll',
                    style: {width: '50px'},
                    maxLength: 3,
                    value: number
                })),
                DOM.td({key: 'country', className: 'col-sm-1'}, DOM.div({
                    key: 'country-inner',
                    style: {height: '20px'}
                }, React.createElement(SelectCellView, {
                    key: 'country-cell',
                    value: country,
                    items: this.state.countries,
                    renderer: (country) => DOM.div({
                        style: {
                            display: 'inline-block',
                            width: '40px'
                        }
                    }, country ? React.createElement(CountryFlagView, {
                        country: country
                    }) : '')
                }))),
                DOM.td({key: 'name', className: 'col-sm-4'}, React.createElement(TextCellView, {
                    key: 'name-cell',
                    className: 'without-scroll',
                    value: name
                })),
                DOM.td({
                    key: 'motorcycle',
                    className: 'col-sm-4'
                }, React.createElement(TextCellView, {
                    key: 'motorcycle-cell',
                    className: 'without-scroll',
                    value: motorcycle
                })),
                DOM.td({
                    key: 'birthday',
                    className: 'col-sm-3'
                }, React.createElement(DateCellView, {key: 'birthday-cell', value: birthday})),

                DOM.td({key: 'validation'}, this.props.last ? "" : validationStatus
                    ? React.createElement(ReactBootstrap.Glyphicon, {glyph: 'ok'})
                    : React.createElement(ReactBootstrap.Glyphicon, {glyph: 'remove'}))
            ]);
        }
    }


    class RegistrationView extends Shuttle.React.Component {

        render() {
            const DOM = React.DOM;

            const eventId = this.props.params.eventId;
            const shuffle = () => {
                this.props.participants.set(R.sortBy(Math.random, this.state.participants))
            };

            return DOM.div({key: 'registration-root'}, [
                React.createElement(ReactBootstrap.Pager, {key: 'pager-root'}, [
                    React.createElement(ReactBootstrap.PageItem, {
                        key: 'previous',
                        previous: true,
                        href: `#event/${eventId}/configuration`
                    }, [
                        React.createElement(ReactBootstrap.Glyphicon, {
                            key: 'glyph',
                            glyph: 'menu-left'
                        }), ' ', "Configuration"
                    ]),
                    React.createElement(ReactBootstrap.PageItem, {
                        key: 'current',
                        href: `#event/${eventId}/registration`
                    }, "Registration"),
                    React.createElement(ReactBootstrap.PageItem, {
                        key: 'next',
                        next: true,
                        href: `#event/${eventId}/competition`
                    }, [
                        "Competition", ' ', React.createElement(ReactBootstrap.Glyphicon, {
                            key: 'glyph',
                            glyph: 'menu-right'
                        })
                    ])
                ]),

                React.createElement(EditableTableView, {
                    generateNextDefault: () => Shuttle.ref({
                        id: Commons.guid(),
                        number: "",
                        country: null,
                        name: "",
                        motorcycle: "",
                        birthday: moment()
                    }),
                    items: this.props.participants,
                    props: {
                        countries: this.props.countries
                    },
                    getId: participant => participant.id,
                    isEmpty: participant => R.isEmpty(participant.number)
                        && R.isEmpty(participant.country)
                        && R.isEmpty(participant.name)
                        && R.isEmpty(participant.motorcycle),
                    headerRenderer: ParticipantHeaderRenderer,
                    footerRenderer: ParticipantFooterRenderer,
                    itemRenderer: ParticipantRenderer
                }),

                React.createElement(ReactBootstrap.Button, {
                    className: 'pull-right',
                    onClick: () => shuffle()
                }, "Shuffle")
            ]);
        }
    }

    return RegistrationView;
});
