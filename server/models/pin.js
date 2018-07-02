
import mongoose from 'mongoose';

mongoose.connect(process.env.LOCAL_DB_CONN);

const pinSchema = mongoose.Schema({
    title: String,
    thumbnail: String,
    rate: { type: Number, default: 0 },
    ownerImage: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
export let Pin = mongoose.model('Pin', pinSchema, 'pin')
