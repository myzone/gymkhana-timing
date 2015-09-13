'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(['ramda', 'shuttle', 'moment'], function (R, Shuttle, moment) {
    var Participant = function Participant(id, number, country, name, motorcycle, group, birthday, team) {
        _classCallCheck(this, Participant);

        this.id = id;
        this.number = number;
        this.country = country;
        this.name = name;
        this.motorcycle = motorcycle;
        this.group = group;
        this.birthday = birthday;
        this.team = team;
    };

    var Heat = function Heat(participant, result) {
        _classCallCheck(this, Heat);

        this.participant = participant;
        this.result = result;
    };

    var HeatResult = (function () {
        function HeatResult() {
            _classCallCheck(this, HeatResult);
        }

        _createClass(HeatResult, [{
            key: 'visit',
            value: function visit(visitor) {
                console.assert(false);
            }
        }]);

        return HeatResult;
    })();

    var NotStated = (function (_HeatResult) {
        _inherits(NotStated, _HeatResult);

        function NotStated() {
            _classCallCheck(this, NotStated);

            _get(Object.getPrototypeOf(NotStated.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(NotStated, [{
            key: 'visit',
            value: function visit(visitor) {
                visitor.onNotStated(this);
            }
        }]);

        return NotStated;
    })(HeatResult);

    var WrongCourse = (function (_HeatResult2) {
        _inherits(WrongCourse, _HeatResult2);

        function WrongCourse() {
            _classCallCheck(this, WrongCourse);

            _get(Object.getPrototypeOf(WrongCourse.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(WrongCourse, [{
            key: 'visit',
            value: function visit(visitor) {
                visitor.onWrongCourse(this);
            }
        }]);

        return WrongCourse;
    })(HeatResult);

    var TimedResult = (function (_HeatResult3) {
        _inherits(TimedResult, _HeatResult3);

        function TimedResult(time, penalties) {
            _classCallCheck(this, TimedResult);

            _get(Object.getPrototypeOf(TimedResult.prototype), 'constructor', this).call(this);

            this.time = time;
            this.penalties = penalties;
        }

        _createClass(TimedResult, [{
            key: 'visit',
            value: function visit(visitor) {
                visitor.onTimedResult(this);
            }
        }]);

        return TimedResult;
    })(HeatResult);

    var Penalty = function Penalty(id, name, duration) {
        _classCallCheck(this, Penalty);

        this.id = id;
        this.name = name;
        this.duration = duration;
    };

    var Race = function Race(id, title, penalties, participants, heats) {
        _classCallCheck(this, Race);

        this.id = id;
        this.title = title;
        this.penalties = penalties;
        this.participants = participants;
        this.heats = heats;
    };

    var Application = function Application(races) {
        _classCallCheck(this, Application);

        this.races = races;
    };
});

//# sourceMappingURL=application.js.map