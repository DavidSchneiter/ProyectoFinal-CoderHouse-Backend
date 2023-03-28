import bcrypt from 'bcrypt';
import { User } from '../models';
import { IUser } from '../interfaces/index';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { logger } from './logger';

const validatePassword = (user:IUser, password:string) => {
  return bcrypt.compareSync(password, user.password);
};

passport.use("login", new LocalStrategy({ usernameField: "email"}, (email:string, password:string, done:Function) => {
   User.findOne({ email: email.toLowerCase() }, (err: NativeError, user: IUser) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        if (!validatePassword(user, password)) {
          logger.info("Invalid Password");
          return done(null, false);
     }
      return done(null, user);
    });
  }
))


passport.serializeUser<any, any>((req, user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: NativeError, user:IUser) =>{
    done(err, user);
  });
});
