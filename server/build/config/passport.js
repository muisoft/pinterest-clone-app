'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _passportLocal = require('passport-local');

var _user = require('../models/user');

var _utils = require('../routes/utils');

var _passportStrategies = require('./passport-strategies');

exports.default = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        _user.User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signin', _passportStrategies.LocalLogin);
    passport.use('local-signup', _passportStrategies.LocalSignup);
    passport.use('twitter-signin', _passportStrategies.TwitterLogin);
};