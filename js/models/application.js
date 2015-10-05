'use strict';

define(['ramda', 'shuttle', 'moment', 'utils/commons'], function (R, Shuttle, moment, Commons) {
    var Application = {
        empty: function empty() {
            return Shuttle.ref({});
        },
        emptyEvent: function emptyEvent(id, name) {
            return Shuttle.ref({
                id: id,
                configuration: Shuttle.ref({
                    name: name,
                    penalties: {},
                    countries: [],
                    course: null
                }),
                participants: Shuttle.ref([]),
                heats: Shuttle.ref([])
            });
        },
        marshall: function marshall(application) {
            return JSON.stringify(Shuttle.json(application));
        },
        unmashall: function unmashall(raw) {
            return Shuttle.ref(R.mapObj(function (event) {
                return Shuttle.ref({
                    id: event.id,
                    configuration: Shuttle.ref({
                        name: event.configuration.name,
                        penalties: R.mapObj(function (penalty) {
                            return Shuttle.ref({
                                id: penalty.id,
                                name: penalty.name,
                                description: penalty.description,
                                delay: moment.duration(penalty.delay),
                                type: penalty.type
                            });
                        }, event.configuration.penalties),
                        countries: event.configuration.countries,
                        course: event.configuration.course
                    }),
                    participants: Shuttle.ref(R.map(function (participant) {
                        return Shuttle.ref({
                            id: participant.id,
                            number: participant.number,
                            country: participant.country,
                            name: participant.name,
                            motorcycle: participant.motorcycle,
                            group: participant.group,
                            birthday: moment(participant.birthday),
                            team: participant.team
                        });
                    }, event.participants)),
                    heats: Shuttle.ref(R.map(function (heat) {
                        return R.identity({
                            id: heat.id,
                            participant: heat.participant,
                            number: heat.number,
                            result: {
                                type: heat.result.type,
                                time: heat.result.time ? moment.duration(heat.result.time) : undefined,
                                penalties: heat.result.penalties
                            }
                        });
                    }, event.heats))
                });
            }, JSON.parse(raw)));
        },
        validate: function validate(raw) {
            try {
                return R.equals(JSON.parse(raw), JSON.parse(Application.marshall(Application.unmashall(raw))));
            } catch (e) {
                return false;
            }
        }
    };

    return Application;
});

//# sourceMappingURL=application.js.map