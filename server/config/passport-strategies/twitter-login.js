import { Strategy as TwitterStrategy } from 'passport-twitter';
//import '../../dotenvconfig.js';
import { User } from '../../models';

export default new TwitterStrategy({
    consumerKey: 'njyhtrghjkugfderfvbhm',//process.env.TWITTER_API_KEY,
    consumerSecret: 'kkjhgfdsdfghjkl;lkjhvcfgh',//process.env.TWITTER_API_SECRET,
    callbackURL: 'http://lobghgffddd'//process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) =>{
    User.findOneAndUpdate(
        { twitterId: profile.id},
        { twitterId: profile.id, username: profile.username, password: profile.id},
        { upsert: 'true'}
    ).exec((err, user) => {
        if(err) return done(err);
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
})
