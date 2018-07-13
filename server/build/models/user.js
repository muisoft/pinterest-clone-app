"use strict";

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    twitterId: { type: String, default: "" }
});

module.exports = mongoose.model('User', UserSchema);