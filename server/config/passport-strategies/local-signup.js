const passport = require('passport');
const LocalSignupStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = () => {
      passport.use(('local-signup'), new LocalSignupStrategy({
          passReqToCallback: true
      }, (req, username, password, done) => {
          /**findOrCreate = () => {
              User.findOne({ username: username }, (err, user) => {
                  if (err) return done(err);
                  if (user) {
                      done(null, false, req.flash('message', 'User already exist'));
                  } else {
                      let newUser = new User();
                      newUser.username = username;
                      newUser.password = createHash(password);
                      newUser.email = req.params.email;
                      newUser.save((err) => {
                          if (err) {
                              console.log('Error in saving new User');
                              throw err;
                          }
                          console.log('Saved new User successfully');
                          done(null, newUser);
                      })
                  }

              });
          }
          process.nextTick(findOrCreate);**/
          User.findOneAndUpdate(
            { username: username },
            {
              username: username,
              password: createHash(password),
              email: req.params.email
            },
            {upsert: 'true'})
            .exec((err, user) => {
               if (err) return done(err);
               if (user) {
                 return done(null, user);
               } else {
                 return done(null, false);
               }
            });

      }));

}
