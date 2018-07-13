'use strict';

var express = require('express');
var passport = require('passport');
//const User = require('mongoose').model('User');

//const signup = require('./utils/')
/**const {
    signup,
    savePics, allPics,
    myPics,
    deletePics,
    ratePics
} = require('./utils');**/
var utils = require('./utils');

var router = express.Router();

var redir = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/';

var isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect(redir);
  }
};

router.get('/signout', function (req, res) {
  req.logout();
  res.json({ success: true });
});

router.get('/auth/twitter', function (req, res, next) {
  return passport.authenticate('twitter-signin')(req, res, next);
});

router.get('/auth/twitter/callback', passport.authenticate('twitter-signin', { failureredirect: redir + 'account/login' }), function (req, res) {
  res.redirect(redir + 'allpics');
});

router.post('/signin', function (req, res, next) {

  return passport.authenticate('local-signin', function (err, user) {
    req.logIn(user, function (err) {
      return res.json(user);
    });
  })(req, res, next);
});

router.post('/signup', function (req, res) {
  utils.signup(req, res);
});

router.post('/savepics', isLoggedIn, function (req, res) {
  utils.savePics(req, res);
});

router.get('/allpics', isLoggedIn, function (req, res) {
  utils.allPics(req, res);
});

router.get('/mypics', isLoggedIn, function (req, res) {
  utils.myPics(req, res);
});

router.post('/deletepics', isLoggedIn, function (req, res) {
  utils.deletePics(req, res);
});

router.post('/ratepics', isLoggedIn, function (req, res) {
  utils.ratePics(req, res);
});

module.exports = router;