const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');


// Local signup strategy
passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    paswordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    User.findOne({ 'local.email': email }, (err, user) => {
      if (err) { return done(err); }

      if (user) {
        return done(null, false, { message: 'That email already exists.' });
      } else {
        const newUser = new User({
          'local.email': email,
          'local.password': password
        }).save(err => {
          if (err) { throw err };
        });
        return done(null, newUser);
        console.log(newUser);
      }

      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      //
      // return done(null, user);
    });
  }
));
