const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

export.defaults = (passport) => {
      passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
      }, (req, username, password, done) => {
        console.log('Username: '+ username);
        User.findOne({username: username}, (err, user) => {
          if(err) return done(err);
          if(!user) {
            return done(null, false, req.flash('message', 'User not found'));
          }
          //if(!user.isCorrectPassword(password)){
            // return done(null, false, req.flash('message', 'Wrong password'));
         // }
          return done(null, user);
       })
    });
}
