import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../models';

export default new LocalStrategy({
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
})