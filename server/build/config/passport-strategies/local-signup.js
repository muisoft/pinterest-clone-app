'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _passportLocal = require('passport-local');

var _models = require('../../models');

exports.default = new _passportLocal.Strategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    findOrCreate = function findOrCreate() {
        _models.User.findOne({ username: username }, function (err, user) {
            if (err) return done(err);
            if (user) {
                done(null, false, req.flash('message', 'User already exist'));
            } else {
                var newUser = new _models.User();
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
});