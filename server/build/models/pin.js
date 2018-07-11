'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pin = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(process.env.DB_CONN);

var pinSchema = _mongoose2.default.Schema({
    title: String,
    thumbnail: String,
    rate: { type: Number, default: 0 },
    ownerImage: String,
    owner: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' }
});
var Pin = exports.Pin = _mongoose2.default.model('Pin', pinSchema, 'pin');