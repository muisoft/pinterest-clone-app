'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _models = require('../models');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = exports.router = _express2.default.Router();

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
  return _passport2.default.authenticate('twitter-signin')(req, res, next);
});

router.get('/auth/twitter/callback', _passport2.default.authenticate('twitter-signin', { failureredirect: redir + 'account/login' }), function (req, res) {
  res.redirect(redir + 'allpics');
});

router.post('/signin', function (req, res, next) {

  return _passport2.default.authenticate('local-signin', function (err, user) {
    req.logIn(user, function (err) {
      return res.json(user);
    });
  })(req, res, next);
});

router.post('/signup', function (req, res) {
  (0, _utils.signup)(req, res);
});

router.post('/savepics', isLoggedIn, function (req, res) {
  (0, _utils.savePics)(req, res);
});

router.get('/allpics', isLoggedIn, function (req, res) {
  (0, _utils.allPics)(req, res);
});

router.get('/mypics', isLoggedIn, function (req, res) {
  (0, _utils.myPics)(req, res);
});

router.post('/deletepics', isLoggedIn, function (req, res) {
  (0, _utils.deletePics)(req, res);
});

router.post('/ratepics', isLoggedIn, function (req, res) {
  (0, _utils.ratePics)(req, res);
});