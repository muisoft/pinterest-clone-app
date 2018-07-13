'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('mongoose').model('User');

module.exports = function (passport) {
    passport.use('twitter-login', new TwitterStrategy({
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, function (accessToken, refreshToken, profile, done) {
        User.findOneAndUpdate({ twitterId: profile.id }, { twitterId: profile.id, username: profile.username, password: profile.id }, { upsert: 'true' }).exec(function (err, user) {
            if (err) return done(err);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
};