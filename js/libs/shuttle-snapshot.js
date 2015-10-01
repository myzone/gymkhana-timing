'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(['ramda', 'utils/commons'], function (R, Commons) {
    var Ref = (function () {
        function Ref(initialState, dependencies) {
            _classCallCheck(this, Ref);

            this.guid = Commons.guid();

            this.listeners = new Set();
            this.dependencies = dependencies;
            this.value = initialState;
        }

        _createClass(Ref, [{
            key: 'get',
            value: function get() {
                return this.value;
            }
        }, {
            key: 'set',
            value: function set(newState) {
                var oldState = this.value;
                this.value = newState;

                if (!R.equals(oldState, newState)) {
                    this.listeners.forEach(function (listener) {
                        return listener(oldState, newState);
                    });
                }
            }
        }, {
            key: 'filter',
            value: function filter(filterer, defaultState) {
                var innerResult = new Ref(filterer(this.value) ? this.value : defaultState, [this]);

                this.addListener(function (oldState, newState) {
                    if (filterer(newState)) {
                        innerResult.set(newState);
                    }
                });

                return innerResult;
            }
        }, {
            key: 'map',
            value: function map(mapper) {
                var innerResult = new Ref(mapper(this.value), [this]);

                this.addListener(function (oldState, newState) {
                    return innerResult.set(mapper(newState));
                });

                return innerResult;
            }
        }, {
            key: 'flatMap',
            value: function flatMap(mapper) {
                var proxy = new Ref(mapper(this.value), [this]);
                this.addListener(function (oldState, newState) {
                    proxy.set(mapper(newState));
                });

                var result = new Ref(proxy.get() ? proxy.get().get() : null, [proxy]);
                result.addListener(function (oldState, newState) {
                    proxy.get().set(newState);
                });

                var listener = function listener(oldState, newState) {
                    result.set(newState);
                };

                proxy.addListener(function (oldState, newState) {
                    if (oldState) oldState.removeListener(listener);

                    if (newState) newState.addListener(listener);

                    listener(oldState ? oldState.get() : null, newState ? newState.get() : null);
                });

                if (proxy.get()) {
                    proxy.get().addListener(listener);
                }

                return result;
            }
        }, {
            key: 'addListener',
            value: function addListener(listener) {
                this.listeners.add(listener);
            }
        }, {
            key: 'removeListener',
            value: function removeListener(listener) {
                this.listeners['delete'](listener);
            }
        }, {
            key: 'log',
            value: function log(mapper) {
                mapper = mapper || R.identity;

                this.addListener(function (oldState, newState) {
                    console.log({
                        oldState: mapper(oldState),
                        newState: mapper(newState)
                    });
                });

                return this;
            }
        }]);

        return Ref;
    })();

    var ref = function ref(initialState) {
        return new Ref(initialState, []);
    };
    var combine = function combine(observables, combiner) {
        var args = function args() {
            return R.map(function (observable) {
                return observable.get();
            }, observables);
        };
        var dependencies = function dependencies(observables) {
            var flatDependencyTree = function flatDependencyTree(observables) {
                return R.concat(observables, R.map(flatDependencyTree, R.map(function (observable) {
                    return observable.dependencies;
                }, observables)));
            };

            return R.intersection(observables, R.uniq(flatDependencyTree(observables)));
        };

        var realDependencies = dependencies(observables);
        var innerResult = new Ref(R.apply(combiner, args()), realDependencies);

        R.forEach(function (observable) {
            return observable.addListener(function () {
                return innerResult.set(R.apply(combiner, args()));
            });
        }, realDependencies);

        return innerResult;
    };
    var json = function json(_x) {
        var _again = true;

        _function: while (_again) {
            var observable = _x;
            _again = false;

            if (R.isNil(observable)) return observable;

            if (observable instanceof Ref) {
                _x = observable.get();
                _again = true;
                continue _function;
            }

            if (observable instanceof Array) return R.map(json, observable);

            if (typeof observable == 'object' && observable.constructor == Object) return R.mapObj(json, observable);

            return observable;
        }
    };

    return {
        Ref: Ref,

        ref: ref,
        combine: combine,
        json: json
    };
});

//# sourceMappingURL=shuttle-snapshot.js.map