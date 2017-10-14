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
    User.findOne({ 'local.email': email }, (err, user) => {
      if (err) { return done(err); }

      if (user) {
        console.log('user error:', user);
        return done(null, false, req.flash('signUpMessage', 'That email is already taken.'));
      } else {
        new User({
          'local.email': email,
          'local.password': password
        })
        .save()
        .then(user => {
          done(null, user)
        })
        .catch(err => {
          console.log('error:', err);
          done(err);
        });
      }
    });

  }
));
