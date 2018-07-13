'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

//import { LocalLogin, LocalSignup, TwitterLogin } from './passport-strategies';

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    require('./passport-strategies/local-login')(passport);
    require('./passport-strategies/local-signup')(passport);
    require('./passport-strategies/twitter-login')(passport);
};