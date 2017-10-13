const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {

});

passport.deserializeUser((id, done) => {

});

// Local signup strategy
passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    paswordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    console.log(req.body);
    User.findOne({ 'local.email': email }, (err, user) => {
      console.log('err', err);
      console.log('user', user);
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
        console.log('newUser', newUser);
        return done(null, newUser);

      }
    });
  }
));
