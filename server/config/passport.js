import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models/user';
import { isCorrectPassword, createHash } from '../routes/utils';
import { LocalLogin, LocalSignup, TwitterLogin } from './passport-strategies';

export default (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-signin', LocalLogin);
    passport.use('local-signup', LocalSignup);
    passport.use('twitter-signin', TwitterLogin);
}
