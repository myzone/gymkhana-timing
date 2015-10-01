define(['ramda'], (R) => {
    class Ref {

        listeners;
        dependencies;
        value;

        constructor(initialState, dependencies) {
            this.listeners = new Set();
            this.dependencies = dependencies;
            this.value = initialState
        }

        get() {
            return this.value;
        }

        set(newState) {
            const oldState = this.value;
            this.value = newState;


            if (!R.equals(oldState, newState)) {
                this.listeners.forEach(listener => listener(oldState, newState));
            }
        };

        filter(filterer, defaultState) {
            const innerResult = new Ref(filterer(this.value)
                ? this.value
                : defaultState, [this]);

            this.addListener((oldState, newState) => {
                if (filterer(newState)) {
                    innerResult.set(newState);
                }
            });

            return innerResult;
        };

        map(mapper) {
            var innerResult = new Ref(mapper(this.value), [this]);

            this.addListener((oldState, newState) => innerResult.set(mapper(newState)));

            return innerResult;
        };

        flatMap(mapper) {
            let currentMapped = mapper(this.value);

            const innerResult = new Ref(currentMapped ? currentMapped.get() : null, [this]);

            innerResult.addListener((oldState, newState) => {
                if (currentMapped) {
                    currentMapped.set(newState);
                }
            });

            const listener = function (oldState, newState) {
                innerResult.set(newState);
            };
            if (currentMapped) {
                currentMapped.addListener(listener);
            }

            this.addListener((oldState, newState) => {
                const oldMapped = oldState ? mapper(oldState) : null;
                const newMapped = newState ? mapper(newState) : null;

                if (oldMapped)
                    oldMapped.removeListener(listener);

                if (newMapped)
                    newMapped.addListener(listener);

                currentMapped = newMapped;
                listener(oldMapped ? oldMapped.get() : null, newMapped ? newMapped.get() : null);
            });

            return innerResult;
        }

        addListener(listener) {
            this.listeners.add(listener);
        }
        removeListener(listener) {
            this.listeners.delete(listener);
        }

        log(mapper) {
            mapper = mapper || R.identity;

            this.addListener((oldState, newState) => {
                console.log({
                    oldState: mapper(oldState),
                    newState: mapper(newState)
                });
            });

            return this;
        };

    }

    var ref = (initialState) => {
        return new Ref(initialState, []);
    };
    var combine = (observables, combiner) => {
        const args = () => R.map(observable => observable.get(), observables);
        const dependencies = observables => {
            const flatDependencyTree = observables => R.concat(observables, R.map(flatDependencyTree, R.map(observable => observable.dependencies, observables)));

            return R.intersection(observables, R.uniq(flatDependencyTree(observables)))
        };

        const realDependencies = dependencies(observables);
        const innerResult = new Ref(R.apply(combiner, args()), realDependencies);

        R.forEach(observable => observable.addListener(() => innerResult.set(R.apply(combiner, args()))), realDependencies);

        return innerResult;
    };
    var json = observable => {
        if (R.isNil(observable))
            return observable;

        if (observable instanceof Ref)
            return json(observable.get());

        if (observable instanceof Array)
            return R.map(json, observable);

        if (typeof observable == 'object' && observable.constructor == Object)
            return R.mapObj(json, observable);

        return observable;
    };

    return {
        Ref: Ref,

        ref: ref,
        combine: combine,
        json: json
    };
});