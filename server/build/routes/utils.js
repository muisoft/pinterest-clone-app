'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ratePics = exports.deletePics = exports.signup = exports.myPics = exports.allPics = exports.savePics = exports.createHash = exports.isCurrectPassword = undefined;

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _models = require('../models');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isCurrectPassword = exports.isCurrectPassword = function isCurrectPassword(user, password) {
  return _bcryptNodejs2.default.compareSync(password, user.password);
};

var createHash = exports.createHash = function createHash(password) {
  return _bcryptNodejs2.default.hashSync(password, genSaltSync(10), null);
};

var savePics = exports.savePics = function savePics(req, res) {
  var _req$body = req.body,
      id = _req$body.id,
      title = _req$body.title,
      thumbnail = _req$body.thumbnail,
      owner = _req$body.owner;


  _models.Pin.findOne({ owner: id }, function (err, p) {
    _models.User.findOne({ _id: id }, function (err, user) {
      var image = void 0;
      if (user.thumbnail) {
        image = user.thumbnail;
      } else if (p) {
        image = p.thumbnail;
      } else {
        image = thumbnail;
      }

      var pin = new _models.Pin({ title: title, thumbnail: thumbnail, ownerImage: image, owner: id });
      _models.User.findOneAndUpdate({ _id: id }, { thumbnail: image }, function (err, update) {
        pin.save(function (err, pin) {
          res.json({ message: owner, user: update });
        });
      });
    });
  });
};

var allPics = exports.allPics = function allPics(req, res) {
  _models.Pin.find({}, function (err, pins) {
    res.json({ pins: pins, user: req.user });
  });
};

var myPics = exports.myPics = function myPics(req, res) {
  var _id = req.user._id;


  _models.Pin.find({ owner: _id }, function (err, pins) {
    res.json(pins);
  });
};

var signup = exports.signup = function signup(req, res) {
  var _req$body2 = req.body,
      username = _req$body2.username,
      email = _req$body2.email,
      password = _req$body2.password;


  _models.User.findOne({ username: username }, function (err, user) {
    if (user) {
      console.log('Username already exists');
      res.json({ message: 'Username already exists' });
    } else {
      var newUser = new _models.User({ username: username, email: email, password: password });
      newUser.save(function (err, user) {
        res.json(user);
      });
    }
  });
};

var deletePics = exports.deletePics = function deletePics(req, res) {
  var id = req.body.id;


  _models.Pin.findOneAndRemove({ _id: id }, function (pin) {
    res.json({ success: true });
  });
};
var ratePics = exports.ratePics = function ratePics(req, res) {
  var _req$body3 = req.body,
      id = _req$body3.id,
      rate = _req$body3.rate;


  _models.Pin.findOneAndUpdate({ _id: id }, { rate: rate }, function (pin) {
    _models.Pin.find({}, function (err, pins) {
      res.json(pins);
    });
  });
};