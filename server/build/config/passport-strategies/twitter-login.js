'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _passportTwitter = require('passport-twitter');

var _models = require('../../models');

exports.default = new _passportTwitter.Strategy({
    consumerKey: 'njyhtrghjkugfderfvbhm', //process.env.TWITTER_API_KEY,
    consumerSecret: 'kkjhgfdsdfghjkl;lkjhvcfgh', //process.env.TWITTER_API_SECRET,
    callbackURL: 'http://lobghgffddd' //process.env.CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
    _models.User.findOneAndUpdate({ twitterId: profile.id }, { twitterId: profile.id, username: profile.username, password: profile.id }, { upsert: 'true' }).exec(function (err, user) {
        if (err) return done(err);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});
//import '../../dotenvconfig.js';