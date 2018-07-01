'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportLocal = require('passport-local');

var _models = require('../../models');

exports.default = new _passportLocal.Strategy({
  passReqToCallback: true
}, function (req, username, password, done) {
  console.log('Username: ' + username);
  _models.User.findOne({ username: username }, function (err, user) {
    if (err) return done(err);
    if (!user) {
      return done(null, false, req.flash('message', 'User not found'));
    }
    //if(!user.isCorrectPassword(password)){
    // return done(null, false, req.flash('message', 'Wrong password'));
    // } 
    return done(null, user);
  });
});