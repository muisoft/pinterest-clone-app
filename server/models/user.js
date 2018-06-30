//import '../dotenvconfig';
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/pinterest');//process.env.DB_CONN);
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    twitterId: { type: String, default: "" }
})

export let User = mongoose.model('User', userSchema, "user");
