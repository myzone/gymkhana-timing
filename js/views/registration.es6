////������ ��������� ���� ������� �������
//������� �����\����� ��������� ������
//������� �������������� ������� �� �����
//������� ���������
//��������� ������� � ���., ...
//��������� �������+������ � �������������
define(['react', 'react-bootstrap', 'react-router', 'ramda', 'shuttle', 'shuttle-react', 'utils/commons'], (React, ReactBootstrap, ReactRouter, R, Shuttle, ShuttleReact, Commons) => {


    class Cell extends Shuttle.React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            return React.DOM.textarea({
                defaultValue: this.state.value,
                onChange: (event)=> {
                    this.props.value.set(event.target.value);
                }
            })
        }
    }

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
            super.componentWillUnmount();

            this.participant.removeListener(this.listener);
        }

        render() {
            const DOM = React.DOM;
            const participant = this.state.participant;
            const onDelete = this.props.onDelete;

            return DOM.tr({}, [
                DOM.td({style: {width: '24px'}}, React.createElement(ReactBootstrap.Button, {
                    disabled: this.props.last,
                    bsSize: 'xsmall',
                    onClick: onDelete
                }, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'trash'}))),
                DOM.td({}, DOM.span({className: 'race-number'}, participant.number)),
                DOM.td({}, DOM.img({
                    height: '20px',
                    src: `http://www.geonames.org/flags/x/${participant.country}.gif`
                })),
                DOM.td({}, React.createElement(Cell, {value: this.name})),
                DOM.td({}, DOM.textarea({defaultValue: participant.motorcycle})),
                DOM.td({}, DOM.textarea({defaultValue: participant.group})),
                DOM.td({}, participant.birthday),
                DOM.td({}, DOM.textarea({defaultValue: participant.team}))
            ]);
        }

    }


    class RegistrationView extends Shuttle.React.Component {

        listener;
        last;

        constructor(props) {
            super(props);

            this.listener = (_, participant) => {
                if (participant.number.length != 0
                    || participant.country.length != 0
                    || participant.name.length != 0
                    || participant.motorcycle.length != 0
                    || participant.group.length != 0
                    || participant.team.length != 0) {

                    const last = this.last;

                    this.last = Shuttle.ref({id: Commons.guid(), number: "", country: "", name: "", motorcycle: "", group: "", birthday: "", team: ""});
                    this.last.addListener(this.listener);

                    last.removeListener(this.listener);
                    this.props.participants.set(R.append(last, this.state.participants));
                }
            };

            this.last = Shuttle.ref({id: Commons.guid(), number: "", country: "", name: "", motorcycle: "", group: "", birthday: "", team: ""});
            this.last.addListener(this.listener)
        }

        render() {
            const DOM = React.DOM;

            const eventId = this.props.params.eventId;

            return DOM.div({}, [
                React.createElement(ReactBootstrap.Pager, {}, [
                    React.createElement(ReactBootstrap.PageItem, {
                        previous: true,
                        href: `#event/${eventId}/configuration`
                    }, [
                        React.createElement(ReactBootstrap.Glyphicon, {glyph: 'menu-left'}), ' ', "Configuration"
                    ]),
                    React.createElement(ReactBootstrap.PageItem, {href: `#event/${eventId}/registration`}, "Registration"),
                    React.createElement(ReactBootstrap.PageItem, {next: true, href: `#event/${eventId}/competition`}, [
                        "Competition", ' ', React.createElement(ReactBootstrap.Glyphicon, {glyph: 'menu-right'})
                    ])
                ]),

                React.createElement(ReactBootstrap.Table, {
                    className: 'dataEditable',
                    responsive: true,
                    hover: true,
                    striped: true
                }, [
                    DOM.thead({}, DOM.tr({}, [
                        DOM.td({}, ""),
                        DOM.td({}, "#"),
                        DOM.th({}, "Country"),
                        DOM.th({}, "Name"),
                        DOM.th({}, "Motorcycle"),
                        DOM.th({}, "Group"),
                        DOM.th({}, "Birthday"),
                        DOM.th({}, "Team")
                    ])),

                    DOM.tbody({}, [
                        R.map((participant, i) => React.createElement(ParticipantView, {
                                key: participant.get().id,
                                participant: participant,
                                onDelete: () => {
                                    this.props.participants.set(R.filter((p) => p.get().id !== participant.get().id, this.state.participants))
                                }
                        }), this.state.participants),

                        React.createElement(ParticipantView, {
                            key: this.last.get().id,
                            participant: this.last,
                            last: true,
                            onDelete: () => {}
                        })
                    ])
                ])
            ]);
        }
    }

    return RegistrationView;
});
