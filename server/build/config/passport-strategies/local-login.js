'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function (passport) {
  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  }, function (req, username, password, done) {
    console.log('Username: ' + username);
    User.findOne({ username: username }, function (err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, req.flash('message', 'User not found'));
      }
      //if(!user.isCorrectPassword(password)){
      // return done(null, false, req.flash('message', 'Wrong password'));
      // }
      return done(null, user);
    });
  }));
};