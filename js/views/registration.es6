////������ ��������� ���� ������� �������
//������� �����\����� ��������� ������
//������� �������������� ������� �� �����
//������� ���������
//��������� ������� � ���., ...
//��������� �������+������ � �������������
define(['react', 'react-bootstrap', 'react-router', 'ramda', 'shuttle', 'shuttle-react', 'components/text-cell', 'components/date-cell', 'components/select-cell', 'utils/commons'], (React, ReactBootstrap, ReactRouter, R, Shuttle, ShuttleReact, TextCellView, DateCellView, SelectCellView, Commons) => {

    class ParticipantView extends Shuttle.React.Component {

        number;
        country;
        name;
        motorcycle;
        group;
        birthday;
        team;

        listener;
        participant;

        constructor(props) {
            super(props);

            const participant = this.state.participant;

            this.number = Shuttle.ref(participant.number);
            this.country = Shuttle.ref(participant.country);
            this.name = Shuttle.ref(participant.name);
            this.motorcycle = Shuttle.ref(participant.motorcycle);
            this.group = Shuttle.ref(participant.group);
            this.birthday = Shuttle.ref(participant.birthday);
            this.team = Shuttle.ref(participant.team);

            this.listener = (_, participant) => this.props.participant.set(participant);
            this.participant = Shuttle.combine([this.number, this.country, this.name, this.motorcycle, this.group, this.birthday, this.team], (number, country, name, motorcycle, group, birthday, team) => {
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
            });
        }

        componentDidMount() {
            super.componentDidMount();

            this.participant.addListener(this.listener);
        }

        componentWillUnmount() {
            this.participant.removeListener(this.listener);

            super.componentWillUnmount();
        }

        render() {
            const DOM = React.DOM;
            const onDelete = this.props.onDelete;

            return DOM.tr({key: 'row'}, [
                DOM.td({key: 'trash', style: {width: '24px'}}, React.createElement(ReactBootstrap.Button, {
                    key: 'button',
                    disabled: this.props.last,
                    bsSize: 'xsmall',
                    onClick: onDelete
                }, React.createElement(ReactBootstrap.Glyphicon, {key: 'glyph', glyph: 'trash'}))),
                DOM.td({key: 'number'}, React.createElement(TextCellView, {
                    key: 'number-cell',
                    className: 'race-number',
                    style: {width: '40px'},
                    value: this.number
                })),
                DOM.td({key: 'country'}, DOM.div({key: 'country-inner', style: {height: '20px'}}, React.createElement(SelectCellView, {
                    key: 'country-cell',
                    value: this.country,
                    items: [
                        "ua",
                        "ru",
                        "by",
                        "pl",
                        "md",
                        "ro"
                    ],
                    renderer: (item) => DOM.img({
                        key: 'image',
                        width: '32px',
                        src: `http://www.geonames.org/flags/x/${item}.gif`
                    })
                }))),
                DOM.td({key: 'name'}, React.createElement(TextCellView, {key: 'name-cell', value: this.name})),
                DOM.td({key: 'motorcycle'}, React.createElement(TextCellView, {key: 'motorcycle-cell', value: this.motorcycle})),
                DOM.td({key: 'group'}, React.createElement(TextCellView, {key: 'group-cell', value: this.group})),
                DOM.td({key: 'birthday'}, React.createElement(DateCellView, {key: 'birthday-cell', value: this.birthday})),
                DOM.td({key: 'team'}, React.createElement(TextCellView, {key: 'team-cell', value: this.team}))
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
                    birthday: "2015-09-01",
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
                        React.createElement(ReactBootstrap.Glyphicon, {key: 'glyph', glyph: 'menu-left'}), ' ', "Configuration"
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
                        "Competition", ' ', React.createElement(ReactBootstrap.Glyphicon, {key: 'glyph', glyph: 'menu-right'})
                    ])
                ]),

                React.createElement(ReactBootstrap.Table, {
                    key: 'table',
                    className: 'data-editable',
                    responsive: true,
                    hover: true,
                    striped: true
                }, [
                    DOM.thead({key: 'table-head'}, DOM.tr({key: 'head-row'}, [
                        DOM.td({key: 'id-header'}, ""),
                        DOM.td({key: 'number-header'}, "#"),
                        DOM.th({key: 'country-header'}, "Country"),
                        DOM.th({key: 'name-header'}, "Name"),
                        DOM.th({key: 'motorcycle-header'}, "Motorcycle"),
                        DOM.th({key: 'group-header'}, "Group"),
                        DOM.th({key: 'birthday-header'}, "Birthday"),
                        DOM.th({key: 'team-header'}, "Team")
                    ])),

                    DOM.tbody({key: 'table-body'}, [
                        R.append(React.createElement(ParticipantView, {
                            key: this.last.get().id,
                            participant: this.last,
                            last: true,
                            onDelete: () => {
                            }
                        }), R.map((participant) => React.createElement(ParticipantView, {
                            key: participant.get().id,
                            participant: participant,
                            onDelete: () => {
                                this.props.participants.set(R.filter((p) => p.get().id !== participant.get().id, this.state.participants))
                            }
                        }), this.state.participants))
                    ])
                ])
            ]);
        }
    }

    return RegistrationView;
});
