'use strict';

var mongoose = require('mongoose');

var PinSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    rate: { type: Number, default: 0 },
    ownerImage: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Pin', PinSchema, 'pin');