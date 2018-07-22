const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

//import { LocalLogin, LocalSignup, TwitterLogin } from './passport-strategies';

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    require('./passport-strategies/local-login')(passport);
    require('./passport-strategies/local-signup')(passport);
    require('./passport-strategies/twitter-login')(passport);
    require('./passport-strategies/github-login')(passport);
}
