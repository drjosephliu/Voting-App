const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log('serialize:', user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    console.log('deserialize:', user);
    done(null, user);
  });
});

// Local signup strategy
passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    console.log('req:', req.body);

    User.findOne({ 'local.email': email }, (err, user) => {
      console.log('error:', err);
      console.log('user:', user);
      if (err) { return done(err); }

      if (user) {
        return done(null, false, { message: 'That email already exists' })
      } else {
        new User({
          'local.email': email,
          'local.password': password
        }).save(err => {
          if (err) { throw err };
        }).then(user => {
          console.log('new user:', user);
          return done(null, user)
        });
      }
    });

  }
));
