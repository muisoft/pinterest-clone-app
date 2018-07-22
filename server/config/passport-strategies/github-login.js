require('dotenv').config();
const GithubStrategy = require('passport-github').Strategy;
const User = require('mongoose').model('User');

module.exports = (passport) => {
    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOneAndUpdate(
            { githubId: profile.id },
            { githubId: profile.id, username: profile.username, password: profile.id },
            { upsert: 'true' }
        ).exec((err, user) => {
            if (err) return done(err);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }))
}
