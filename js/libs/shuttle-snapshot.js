define(['ramda'], function (R) {
    var Ref = function (initialState, dependencies) {
        var listeners = new Set();
        var dependencies = dependencies || [];
        var state = {
            value: initialState
        };

        var result = this;
        result.get = function () {
            return state.value;
        };
        result.set = function (newState) {
            var oldState = state.value;
            state.value = newState;


            if (!R.eq(oldState, newState)) {
                listeners.forEach(function (listener) {
                    listener(oldState, newState);
                });
            }
        };
        result.filter = function (filterer, defaultState) {
            var innerResult = ref(filterer(state.value)
                ? state.value
                : defaultState, [result]);

            result.addListener(function (newState) {
                if (filterer(newState)) {
                    innerResult.set(newState);
                }
            });

            return innerResult;
        };
        result.map = function (mapper) {
            var innerResult = ref(mapper(state.value), [result]);

            result.addListener(function (oldState, newState) {
                innerResult.set(mapper(newState));
            });

            return innerResult;
        };
        result.flatMap = function (mapper) {
            var innerState = {
                currentMapped: mapper(state.value)
            };

            var innerResult = ref(innerState.currentMapped ? innerState.currentMapped.get() : null);
            innerResult.addListener(function (oldState, newState) {
                innerState.currentMapped.set(newState);
            });

            var listener = function (oldState, newState) {
                innerResult.set(newState);
            };
            if (innerState.currentMapped)
                innerState.currentMapped.addListener(listener);

            result.addListener(function (oldState, newState) {
                var oldMapped = oldState ? mapper(oldState) : null;
                var newMapped = newState ? mapper(newState) : null;

                if (oldMapped)
                    oldMapped.removeListener(listener);

                if (newMapped)
                    newMapped.addListener(listener);

                innerState.currentMapped = newMapped;
                listener(oldMapped ? oldMapped.get() : null, newMapped ? newMapped.get() : null);
            });

            return innerResult;
        };
        result.addListener = function (listener) {
            listeners.add(listener);

            listener(state.value, state.value);
        };
        result.removeListener = function (listener) {
            listeners.delete(listener);
        };
        result.dependsOn = function (observable) {
            return dependencies.indexOf(observable) !== -1 || R.reduce(R.or, false, R.map(function (dependency) {
                return dependency.dependsOn(observable);
            }, Array.from(dependencies)));
        };
        result.log = function (mapper) {
            mapper = mapper || R.identity;

            result.addListener(function (oldState, newState) {
                console.log({
                    oldState: mapper(oldState),
                    newState: mapper(newState)
                });
            });

            return result;
        };

        return result;
    };
    var ref = function (initialState, dependencies) {
        return new Ref(initialState, dependencies);
    };
    var combine = function (observables, combiner) {
        var args = function () {
            return R.map(function (observable) {
                return observable.get();
            }, observables);
        };

        var innerResult = ref(R.apply(combiner, args()), observables);

        R.forEach(function (observable) {
            observable.addListener(function () {
                innerResult.set(R.apply(combiner, args()));
            })
        }, observables);

        return innerResult;
    };

    return {
        Ref: Ref,
        ref: ref,
        combine: combine
    };
});