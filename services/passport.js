const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');
const keys = require('../config/keys');

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
    passwordField: 'password'
  },
  (email, password, done) => {
    User.findOne({ 'local.email': email })
      .then(user => {
        if (user) {
          return done(null, false);
        } else {

          const newUser = new User();

          newUser.local.email = email;

          newUser.generateHash(password, (err, hash) => {
            newUser.local.password = hash;
          });

          newUser.save()
            .then(user => done(null, user))
            .catch(err => done(err));
        }
      })
      .catch(err => done(err));

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
        if (!user) return done(null, false);

        user.validPassword(password, (err, res) => {
          if (err) return done(err);
          if (!res) return done(null, false);
          done(null, user);
        });
      })
      .catch(err => done(err));
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
              .then(user => {
                done(null, user);
              })
              .catch(err => done(err));
          }
        })
        .catch(err => done(err));
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
              .then(user => {
                done(null, user);
              })
              .catch(err => done(err));
          }
        })
        .catch(err => done(err));
    }
  )
);
