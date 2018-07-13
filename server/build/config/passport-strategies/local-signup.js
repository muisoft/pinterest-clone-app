'use strict';

var LocalSignupStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function (passport) {
    passport.use('local-signin', new LocalSignupStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        findOrCreate = function findOrCreate() {
            User.findOne({ username: username }, function (err, user) {
                if (err) return done(err);
                if (user) {
                    done(null, false, req.flash('message', 'User already exist'));
                } else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.params.email;
                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error in saving new User');
                            throw err;
                        }
                        console.log('Saved new User successfully');
                        done(null, newUser);
                    });
                }
            });
        };
        process.nextTick(findOrCreate);
    }));
};