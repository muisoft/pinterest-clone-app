const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

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
    require('./passport-strategies/github-login')(passport);
}
