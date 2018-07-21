const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = function(passport){
  passport.use('local-signin', new LocalStrategy({
     passReqToCallback: true
  }, (req, username, password, done) => {
      User.findOne({username: username, password: password}, (err, user) => {
        if(err) return done(err);
        if(!user) {
          return done(null, false);
        }
       //if(!user.isCorrectPassword(password)){
         // return done(null, false, req.flash('message', 'Wrong password'));
      // }
        if(user){
         return done(null, user);
       }
    })
 }));
}
