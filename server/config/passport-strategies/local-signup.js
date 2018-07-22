const passport = require('passport');
const LocalSignupStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = () => {
  passport.use(('local-signup'), new LocalSignupStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    User.findOneAndUpdate(
      { username: username },
      {
        username: username,
        password: createHash(password),
        email: req.params.email
      },
      { upsert: 'true' })
      .exec((err, user) => {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
  }));
}
