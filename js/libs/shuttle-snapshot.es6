define(['ramda', 'utils/commons'], (R, Commons) => {
    class Ref {

        listeners;
        dependencies;
        value;

        constructor(initialState, dependencies) {
            this.guid = Commons.guid();

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
            const proxy = new Ref(mapper(this.value), [this]);
            this.addListener((oldState, newState) => {
                proxy.set(mapper(newState));
            });

            const result = new Ref(proxy.get() ? proxy.get().get() : null, [proxy]);
            result.addListener((oldState, newState) => {
                proxy.get().set(newState);
            });

            const listener = (oldState, newState) => {
                result.set(newState);
            };

            proxy.addListener((oldState, newState) => {
                if (oldState)
                    oldState.removeListener(listener);

                if (newState)
                    newState.addListener(listener);

                listener(oldState ? oldState.get() : null, newState ? newState.get() : null);
            });

            if (proxy.get()) {
                proxy.get().addListener(listener);
            }

            return result;
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

    const ref = (initialState) => {
        return new Ref(initialState, []);
    };
    const combine = (observables, combiner) => {
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
    const sequence = (observables) => {
        return combine(observables, Array.of);
    };
    const json = observable => {
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

    const listenTree = (listener, tree) => {
        const handlers = {};

        const withoutListener = (listener, tree) => {
            if (R.isNil(tree)) {
                return tree;
            }

            if (tree instanceof Ref) {
                withoutListener(listener, tree.get());

                tree.removeListener(handlers[tree.guid]);
                delete handlers[tree.guid];

                return tree;
            }

            if (tree instanceof Array) {
                return R.map(i => withoutListener(listener, i), tree);
            }

            if (typeof tree == 'object' && tree.constructor == Object) {
                return R.mapObj(i => withoutListener(listener, i), tree);
            }
        };
        const withListener = (listener, tree) => {
            if (R.isNil(tree)) {
                return tree;
            }

            if (tree instanceof Ref) {
                const handler = (o, n) => {
                    withoutListener(listener, o);
                    withListener(listener, n);

                    listener();
                };
                handlers[tree.guid] = handler;

                tree.addListener(handler);
                withListener(listener, tree.get());

                return tree;
            }

            if (tree instanceof Array) {
                return R.map(i => withListener(listener, i), tree);
            }

            if (typeof tree == 'object' && tree.constructor == Object) {
                return R.mapObj(i => withListener(listener, i), tree);
            }
        };

        withListener(listener, tree);
    };

    return {
        Ref: Ref,

        ref: ref,
        combine: combine,
        sequence: sequence,
        json: json,
        listenTree: listenTree
    };
});