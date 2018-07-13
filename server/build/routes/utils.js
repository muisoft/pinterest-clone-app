'use strict';

//import bCrypt from 'bcrypt-nodejs';
var User = require('mongoose').model('User');
var Pin = require('mongoose').model('Pin');

/**export const isCurrectPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
}

export const createHash = (password) => {
  return bCrypt.hashSync(password, genSaltSync(10), null);
}**/
module.exports = {
  savePics: function savePics(req, res) {
    var _req$body = req.body,
        id = _req$body.id,
        title = _req$body.title,
        thumbnail = _req$body.thumbnail,
        owner = _req$body.owner;


    Pin.findOne({ owner: id }, function (err, p) {
      User.findOne({ _id: id }, function (err, user) {
        var image = void 0;
        if (user.thumbnail) {
          image = user.thumbnail;
        } else if (p) {
          image = p.thumbnail;
        } else {
          image = thumbnail;
        }

        var pin = new Pin({ title: title, thumbnail: thumbnail, ownerImage: image, owner: id });
        User.findOneAndUpdate({ _id: id }, { thumbnail: image }, function (err, update) {
          pin.save(function (err, pin) {
            res.json({ message: owner, user: update });
          });
        });
      });
    });
  },
  allPics: function allPics(req, res) {
    Pin.find({}, function (err, pins) {
      res.json({ pins: pins });
    });
  },
  myPics: function myPics(req, res) {
    var _id = req.user._id;

    console.log('Yewo: ' + JSON.stringify(req.user));
    Pin.find({ owner: _id }, function (err, pins) {
      console.log('Yewo: ' + JSON.stringify(pins));
      res.json(pins);
    });
  },
  signup: function signup(req, res) {
    var _req$body2 = req.body,
        username = _req$body2.username,
        email = _req$body2.email,
        password = _req$body2.password;


    User.findOne({ username: username }, function (err, user) {
      if (user) {
        console.log('Username already exists');
        res.json({ message: 'Username already exists' });
      } else {
        var newUser = new User({ username: username, email: email, password: password });
        newUser.save(function (err, user) {
          res.json(user);
        });
      }
    });
  },
  deletePics: function deletePics(req, res) {
    var id = req.body.id;


    Pin.findOneAndRemove({ _id: id }, function (pin) {
      res.json({ success: true });
    });
  },
  ratePics: function ratePics(req, res) {
    var _req$body3 = req.body,
        id = _req$body3.id,
        rate = _req$body3.rate;


    Pin.findOneAndUpdate({ _id: id }, { rate: rate }, function (pin) {
      Pin.find({}, function (err, pins) {
        res.json(pins);
      });
    });
  }
};