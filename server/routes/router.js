const express = require('express');
const passport = require('passport');
const User = require('mongoose').model('User');

//const signup = require('./utils/')
const {
    signup,
    savePics, allPics,
    myPics,
    deletePics,
    ratePics
} = require('./utils');

const router = express.Router();

const redir = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/';

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect(redir);
  }
}

router.get('/signout', (req, res) => {
    req.logout();
    res.json({ success: true});
})

router.get('/auth/twitter', (req, res, next) => {
  return passport.authenticate('twitter-signin')(req, res, next);
})

router.get('/auth/twitter/callback',
      passport.authenticate('twitter-signin', { failureredirect: redir + 'account/login'}),
      (req, res) => {
        res.redirect(redir + 'allpics')
      })

router.post('/signin', (req, res, next) => {

  return passport.authenticate('local-signin', (err, user) => {
    req.logIn(user, err => {
      return res.json(user);
    })

  })(req, res, next);
});

router.post('/signup', (req, res) => {
  signup(req, res);
})

router.post('/savepics', isLoggedIn, (req, res) => {
  savePics(req, res);
});

router.get('/allpics', isLoggedIn, (req, res) => {
  allPics(req, res);
});

router.get('/mypics', isLoggedIn, (req, res) => {
 myPics(req, res);
});

router.post('/deletepics', isLoggedIn, (req, res) => {
  deletePics(req, res);
});

router.post('/ratepics', isLoggedIn, (req, res) => {
  ratePics(req, res);
});

module.exports = router;
