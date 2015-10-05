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
                DOM.th({key: 'group-header'}, "Group"),
                DOM.th({key: 'birthday-header'}, "Birthday"),
                DOM.th({key: 'team-header'}, "Team")
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
                && !R.isEmpty(participant.motorcycle)
                && !R.isEmpty(participant.group)
                && !R.isEmpty(participant.team);

            const number = Shuttle.ref(participant.number);
            const country = Shuttle.ref(participant.country);
            const name = Shuttle.ref(participant.name);
            const motorcycle = Shuttle.ref(participant.motorcycle);
            const group = Shuttle.ref(participant.group);
            const birthday = Shuttle.ref(participant.birthday);
            const team = Shuttle.ref(participant.team);

            Shuttle
                .combine([number, country, name, motorcycle, group, birthday, team], (number, country, name, motorcycle, group, birthday, team) => {
                    return {
                        id: participant.id,
                        number: number,
                        country: country,
                        name: name,
                        motorcycle: motorcycle,
                        group: group,
                        birthday: birthday,
                        team: team
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
                    className: 'race-number',
                    style: {width: '50px'},
                    maxLength: 3,
                    value: number
                })),
                DOM.td({key: 'country', className: 'col-md-1'}, DOM.div({
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
                DOM.td({key: 'name', className: 'col-md-4'}, React.createElement(TextCellView, {
                    key: 'name-cell',
                    value: name
                })),
                DOM.td({
                    key: 'motorcycle',
                    className: 'col-md-2'
                }, React.createElement(TextCellView, {key: 'motorcycle-cell', value: motorcycle})),
                DOM.td({key: 'group', className: 'col-md-1'}, React.createElement(TextCellView, {
                    key: 'group-cell',
                    value: group
                })),
                DOM.td({
                    key: 'birthday',
                    className: 'col-md-2'
                }, React.createElement(DateCellView, {key: 'birthday-cell', value: birthday})),
                DOM.td({key: 'team', className: 'col-md-1'}, React.createElement(TextCellView, {
                    key: 'team-cell',
                    value: team
                })),
                DOM.td({key: 'validation'}, this.props.last ? "" : validationStatus
                    ? React.createElement(ReactBootstrap.Glyphicon, {glyph: 'ok'})
                    : React.createElement(ReactBootstrap.Glyphicon, {glyph: 'remove'}))
            ]);
        }
    }


    class RegistrationView extends Shuttle.React.Component {

        listener;
        last;

        constructor(props) {
            super(props);

            const generateLast = () => {
                this.last = Shuttle.ref({
                    id: Commons.guid(),
                    number: "",
                    country: "ua",
                    name: "",
                    motorcycle: "",
                    group: "",
                    birthday: moment(),
                    team: ""
                });
                this.last.addListener(this.listener);
            };

            this.listener = (_, participant) => {
                if (participant.number.length != 0
                    || participant.country.length != 0
                    || participant.name.length != 0
                    || participant.motorcycle.length != 0
                    || participant.group.length != 0
                    || participant.team.length != 0) {

                    const last = this.last;
                    generateLast();

                    last.removeListener(this.listener);
                    this.props.participants.set(R.append(last, this.state.participants));
                }
            };

            generateLast();
        }

        render() {
            const DOM = React.DOM;

            const eventId = this.props.params.eventId;

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
                        group: "",
                        birthday: moment(),
                        team: ""
                    }),
                    items: this.props.participants,
                    props: {
                        countries: this.props.countries
                    },
                    getId: participant => participant.id,
                    isEmpty: participant => R.isEmpty(participant.number)
                    && R.isEmpty(participant.country)
                    && R.isEmpty(participant.name)
                    && R.isEmpty(participant.motorcycle)
                    && R.isEmpty(participant.group)
                    && R.isEmpty(participant.team),
                    headerRenderer: ParticipantHeaderRenderer,
                    footerRenderer: ParticipantFooterRenderer,
                    itemRenderer: ParticipantRenderer
                })
            ]);
        }
    }

    return RegistrationView;
});
