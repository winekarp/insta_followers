const defaults = require('./wdio.conf.ts').config;
const _ = require('lodash');

var overrides = {
    specs: [
        './specs/insta_followers.spec.ts',
    ],
};
exports.config = _.defaultsDeep(overrides, defaults);
