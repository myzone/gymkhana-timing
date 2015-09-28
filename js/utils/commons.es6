define(['ramda', 'moment'], (R, moment) => {
    return {
        guid: () => {
            const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);

            return s4();
        },
        getQueryParams: () => R.compose(
            R.reduce((result, item) => R.assoc(item[0], item[1], result), {}),
            R.map(entry => R.split('=', entry)),
            R.split('&'),
            R.replace(/.*\?/g, '')
        )(window.location.hash),
        setQueryParams: (params) => window.location.hash = R.replace(/(.*\?)(.*)/g, `$1${
                R.compose(
                    R.join("&"),
                    R.map(R.join("=")),
                    R.filter(i => i[1]),
                    R.filter(i => i[0] != '_k'),
                    R.values,
                    R.mapObjIndexed((value, key) => [key, value])
                )(params)
            }`, window.location.hash)
    }
});

