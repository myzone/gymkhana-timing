require(['ramda', 'shuttle', 'moment'], (R, Shuttle, moment) => {
    class Participant {
        id;
        number;
        country;
        name;
        motorcycle;
        group;
        birthday;
        team;

        constructor(id, number, country, name, motorcycle, group, birthday, team) {
            this.id = id;
            this.number = number;
            this.country = country;
            this.name = name;
            this.motorcycle = motorcycle;
            this.group = group;
            this.birthday = birthday;
            this.team = team;
        }

    }

    class Heat {
        participant;
        result;

        constructor(participant, result) {
            this.participant = participant;
            this.result = result;
        }
    }

    class HeatResult {
        visit(visitor) {
           console.assert(false);
        }
    }

    class NotStated extends HeatResult {
        visit(visitor) {
            visitor.onNotStated(this);
        }
    }

    class WrongCourse extends HeatResult {
        visit(visitor) {
            visitor.onWrongCourse(this);
        }
    }

    class TimedResult extends HeatResult {
        time;
        penalties;

        constructor(time, penalties) {
            super();

            this.time = time;
            this.penalties = penalties;
        }

        visit(visitor) {
            visitor.onTimedResult(this);
        }
    }

    class Penalty {
        id;
        name;
        duration;

        constructor(id, name, duration) {
            this.id = id;
            this.name = name;
            this.duration = duration;
        }
    }

    class Race {
        id;
        title;
        penalties;
        participants;
        heats;

        constructor(id, title, penalties, participants, heats) {
            this.id = id;
            this.title = title;
            this.penalties = penalties;
            this.participants = participants;
            this.heats = heats;
        }
    }

    class Application {
        races;

        constructor(races) {
            this.races = races;
        }
    }



});


