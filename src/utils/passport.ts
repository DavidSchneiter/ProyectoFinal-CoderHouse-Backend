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

// passport.use(
//   "register",
//   new LocalStrategy({ usernameField: "email" }, (email:string, password:string, cb:Function) => {
//   User.findOne({ email: email.toLowerCase() }, function (err:NativeError, user:IUser) {0
//     if (err) {
//       logger.error("Error in SignUp: " + err);
//       return cb(err);
//     }
//     if (user) {
//       logger.info("User already exists");
//       return cb(null, false);
//     } else {
//       const newUser = new User();
//       newUser.email = email;
//       newUser.password = createHash(password);
//       newUser.name = name;
//       newUser.address = address;
//       newUser.age = age;
//       newUser.cellphone = cellphone;
//       newUser.avatar = avatar;
//       newUser
//         .save()
//         .then((datos) => cb(null, datos))
//         .catch(null);
//     }
//   });
// }));


passport.serializeUser<any, any>((req, user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: NativeError, user:IUser) =>{
    done(err, user);
  });
});

// const login = (email:string, password:string, done:Function) => {
//    User.findOne({ email: email.toLowerCase() }, (err: NativeError, user: IUser) => {
//         if (err) { return done(err); }
//         if (!user) {
//             return done(undefined, false, { message: `Email ${email} not found.` });
//         }
//         if (!validatePassword(user, password)) {
//           console.log("Invalid Password");
//           return done(null, false);
//      }
//       return done(null, user);
//     });
// };

// export const register = (email:string, password:string, cb:Function) => {
//   User.findOne({ email: email.toLowerCase() }, function (err:NativeError, user:IUser) {
//     if (err) {
//       console.log("Error in SignUp: " + err);
//       return cb(err);
//     }
//     if (user) {
//       console.log("User already exists");
//       return cb(null, false);
//     } else {
//       const newUser = new User();
//       newUser.email = email;
//       newUser.password = createHash(password);
//       newUser
//         .save()
//         .then((datos) => cb(null, datos))
//         .catch(null);
//     }
//   });
// };