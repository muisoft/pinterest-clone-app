
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    twitterId: { type: String, default: "" }
})

module.exports = mongoose.model('User', userSchema, "user");
