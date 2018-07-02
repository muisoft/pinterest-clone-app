
import mongoose from 'mongoose'

mongoose.connect(process.env.LOCAL_DB_CONN);
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    twitterId: { type: String, default: "" }
})

export let User = mongoose.model('User', userSchema, "user");
