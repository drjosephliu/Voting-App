const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keys = require('../config/keys');

passport.serializeUser((user, done) => {
  console.log('serialize:', user);
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
    passwordField: 'password'
  },
  (email, password, done) => {

    User.findOne({ 'local.email': email })
      .then(user => {
        if (user) {
          return done(null, false, 'Email has already been taken');
        } else {

          const newUser = new User();

          newUser.local.email = email;

          bcrypt.hash(password, 10)
            .then(hash => {
              newUser.local.password = hash;
              newUser.save()
                .then(user => done(null, user, 'We have emailed you a verification link'));
            });
        }
      });
  }
));

// Local login Strategy
passport.use('local-login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {

    User.findOne({ 'local.email': email })
      .then(user => {
        if (!user) return done(null, false, 'No account with that email exists');

        if (!user.active) return done(null, false, 'Please verify account first');

        bcrypt.compare(password, user.local.password)
          .then(result => {
            if (!result) return done(null, false, 'Wrong password');
            done(null, user)
          });
      });
  }
));

//Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {

      User.findOne({ 'google.id': profile.id })
        .then(existingUser => {
          if(existingUser) {
            return done(null, existingUser);
          } else {
            new User({ 'google.id': profile.id})
              .save()
              .then(user => done(null, user));          }
        });
    }
  )
);

//Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookID,
      clientSecret: keys.facebookSecret,
      callbackURL: '/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, done) => {

      User.findOne({ 'facebook.id': profile.id })
        .then(existingUser => {
          if(existingUser) {
            return done(null, existingUser);
          } else {
            new User({ 'facebook.id': profile.id})
              .save()
              .then(user => done(null, user));
          }
        });
    }
  )
);
