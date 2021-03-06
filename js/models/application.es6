define(['ramda', 'shuttle', 'moment', 'utils/commons'], (R, Shuttle, moment, Commons) => {
    const parse = raw => {
        try {
            return JSON.parse(raw);
        } catch (e) {
            console.error('YOUR DATA IS BROKEN (dump is below)');
            console.error(raw);
            console.error('===================================');

            throw e;
        }
    };

    const Application = {
        empty: () => {
            return Shuttle.ref({});
        },
        emptyEvent: (id, name) => {
            return Shuttle.ref({
                id: id,
                configuration: Shuttle.ref({
                    name: name,
                    eventDate: moment().day(6),
                    eventPlace: null,
                    course: null,
                    penalties: {},
                    countries: []
                }),
                participants: Shuttle.ref([]),
                heats: Shuttle.ref([])
            });
        },
        marshall: application => JSON.stringify(Shuttle.json(application)),
        unmashall: raw => Shuttle.ref(R.mapObj(event => Shuttle.ref({
            id: event.id,
            configuration: Shuttle.ref({
                name: event.configuration.name,
                eventDate: moment(event.configuration.eventDate),
                eventPlace: event.configuration.eventPlace,
                heatCount: event.configuration.heatCount,
                course: event.configuration.course,
                penalties: R.mapObj(penalty => Shuttle.ref({
                    id: penalty.id,
                    name: penalty.name,
                    description: penalty.description,
                    delay: moment.duration(penalty.delay),
                    type: penalty.type
                }), event.configuration.penalties),
                countries: event.configuration.countries
            }),
            participants: Shuttle.ref(R.map(participant => Shuttle.ref({
                id: participant.id,
                number: participant.number,
                country: participant.country,
                name: participant.name,
                motorcycle: participant.motorcycle,
                birthday: moment(participant.birthday)
            }), event.participants)),
            heats: Shuttle.ref(R.map(heat => R.identity({
                id: heat.id,
                participant: heat.participant,
                number: heat.number,
                result: {
                    type: heat.result.type,
                    time: heat.result.time ? moment.duration(heat.result.time) : undefined,
                    penalties: heat.result.penalties
                }
            }), event.heats))
        }), parse(raw))),
        validate: raw => {
            try {
                return R.equals(JSON.parse(raw), JSON.parse(Application.marshall(Application.unmashall(raw))));
            } catch (e) {
                return false;
            }
        }
    };

    return Application;
});
