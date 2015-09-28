'use strict';

define(['ramda', 'moment'], function (R, moment) {
    return {
        guid: function guid() {
            var s4 = function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            };

            return s4();
        },
        getQueryParams: function getQueryParams() {
            return R.compose(R.reduce(function (result, item) {
                return R.assoc(item[0], item[1], result);
            }, {}), R.map(function (entry) {
                return R.split('=', entry);
            }), R.split('&'), R.replace(/.*\?/g, ''))(window.location.hash);
        },
        setQueryParams: function setQueryParams(params) {
            return window.location.hash = R.replace(/(.*\?)(.*)/g, '$1' + R.compose(R.join("&"), R.map(R.join("=")), R.filter(function (i) {
                return i[1];
            }), R.filter(function (i) {
                return i[0] != '_k';
            }), R.values, R.mapObjIndexed(function (value, key) {
                return [key, value];
            }))(params), window.location.hash);
        }
    };
});

//# sourceMappingURL=commons.js.map