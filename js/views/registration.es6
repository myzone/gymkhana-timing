////сздать компонент длдя строчки таблицы
//сделать стиль\макет валидации строки
//сделать редактирование каждого из полей
//сделать валидацию
//научиться рабоать с дан., ...
//настроить колонки+работа с конфигурацией
define(['react', 'react-bootstrap', 'react-router', 'ramda', 'shuttle', 'shuttle-react'], (React, ReactBootstrap, ReactRouter, R, Shuttle, ShuttleReact) => {
    class ParticipantView extends Shuttle.React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            const DOM = React.DOM;
            const participant = this.state.participant;
            const onDelete = this.props.onDelete;


            return DOM.tr({}, [
                DOM.td({style: {width: '24px'}}, React.createElement(ReactBootstrap.Button, {
                    disabled: participant.name.get() == "",
                    bsSize: 'xsmall',
                    onClick: onDelete
                }, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'trash'}))),
                DOM.td({}, DOM.span({className: 'race-number'}, participant.number)),
                DOM.td({}, DOM.img({
                    height: '20px',
                    src: `http://www.geonames.org/flags/x/${participant.country}.gif`
                })),
                DOM.td({}, DOM.textarea({
                    onChange: (event)=> {
                        this.props.participant.flatMap((participant)=>participant.name).set(event.target.value);
                    },
                    value: participant.name.get()
                })),
                DOM.td({}, DOM.textarea({}, participant.motorcycle)),
                DOM.td({}, DOM.textarea({}, participant.group)),
                DOM.td({}, participant.birthday),
                DOM.td({}, DOM.textarea({}, participant.team))
            ]);
        }
    }


    class RegistrationView extends Shuttle.React.Component {

        constructor(props) {
            super(props);
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
                        R.map((participant) => React.createElement(ParticipantView, {
                            participant: participant,
                            onDelete: () => {
                                this.props.application.set({participants: R.filter((p) => p === participant, this.state.application.participants)})
                            }
                        }), this.state.application.participants),
                        DOM.tr({}, [
                            DOM.td({style: {width: '24px'}}, React.createElement(ReactBootstrap.Button, {
                                disabled: true,
                                bsSize: 'xsmall'
                            }, React.createElement(ReactBootstrap.Glyphicon, {glyph: 'trash'}))),
                            DOM.td({}, ""),
                            DOM.td({}, ""),
                            DOM.td({}, ""),
                            DOM.td({}, ""),
                            DOM.td({}, ""),
                            DOM.td({}, ""),
                            DOM.td({}, "")
                        ])
                    ])
                ])
            ]);
        }
    }

    return RegistrationView;
});
