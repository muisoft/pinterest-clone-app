require('dotenv').config();
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('mongoose').model('User');

module.exports = (passport) => {
      passport.use('twitter-login', new TwitterStrategy({
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET,
        callbackURL: '/auth/twitter/callback'
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
    }))
}
