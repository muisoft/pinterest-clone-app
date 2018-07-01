"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(process.env.DB_CONN); //import '../dotenvconfig';

var userSchema = _mongoose2.default.Schema({
    username: String,
    password: String,
    email: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    twitterId: { type: String, default: "" }
});

var User = exports.User = _mongoose2.default.model('User', userSchema, "user");