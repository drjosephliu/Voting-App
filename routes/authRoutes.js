const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');

const keys = require('../config/keys');

const sgMail = require('@sendgrid/mail');
const passwordResetTemplate = require('../services/emailTemplates/passwordResetTemplate');
const accountVerificationTemplate = require('../services/emailTemplates/accountVerificationTemplate');

sgMail.setApiKey(keys.sendGridKey);



module.exports = app => {
  // app.post(
  //   '/api/signup',
  //   passport.authenticate('local-signup'),
  //   (req, res) => {
  //     const email = req.user.local.email;
  //
  //     User.findOne({ 'local.email': email})
  //       .then(user => {
  //
  //
  //         crypto.randomBytes(20, (err, buf) => {
  //           const token = buf.toString('hex');
  //
  //           bcrypt.hash(token, 12)
  //             .then(hash => {
  //               user.local.verificationToken = hash;
  //               user.local.verificationTokenExpires = Date.now() + (1000 * 60 * 60);
  //
  //               user.save()
  //                 .then(user => {
  //
  //                   sgMail.send(accountVerificationTemplate(req, token));
  //                   res.send(user)
  //                 });
  //             });
  //         });
  //       });
  //   }
  // );

  app.post(
    '/api/signup',
    (req, res) => {
      passport.authenticate('local-signup', (err, user, info) => {
        // Return error message if email already taken
        if (!user) return res.status(400).send(info);
        // Otherwise create verification token and email the hashed token
        User.findOne({ 'local.email': req.body.email })
          .then(user => {
            crypto.randomBytes(20, (err, buf) => {
              const token = buf.toString('hex');

              bcrypt.hash(token, 12)
                .then(hash => {

                  user.local.verificationToken = hash;
                  user.local.verificationTokenExpires = Date.now() + (1000 * 60 * 60);

                  user.save()
                    .then(user => {

                      sgMail.send(accountVerificationTemplate(req, token));
                      res.send(info);
                    });
                });
            });
          });
      })(req, res);
    }
  );

  app.get('/api/current_user', (req, res) => {
    // console.log('fetch:', req);
    res.send(req.user);
  });

  // app.post(
  //   '/api/login',
  //   passport.authenticate('local-login'),
  //   (req, res) => {
  //     console.log('login req:', req);
  //     res.send(req.user);
  //   }
  // );

  app.post(
    '/api/login',
    (req, res) => {
      passport.authenticate('local-login', (err, user, info) => {
        console.log('req user:', req.login);
        if (!user) return res.status(400).send(info);
        req.login(user, (err) => {
          return res.send(user);
        });
      })(req, res);
    }
  );

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook')
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post('/api/forgot', (req, res) => {

    User.findOne({ 'local.email': req.body.email })
      .then(user => {

        if(!user) return res.status(400).send('No account with that email address exists');

        crypto.randomBytes(20, (err, buf) => {
          const token = buf.toString('hex');

          bcrypt.hash(token, 12, (err, tokenHash) => {
            user.local.resetToken = tokenHash;
            user.local.resetTokenExpires = Date.now() + (1000 * 60 * 60);

            user.save();
          });

          sgMail.send(passwordResetTemplate(req, token));
          res.send('We have sent you a reset link to your email');
        });
      });
  });

  app.get('/api/reset/:email/:token', (req, res) => {
    User.findOne({ 'local.email': req.params.email })
      .then(user => {
        if (!user) return res.status(400).send('User not found');

        bcrypt.compare(req.params.token, user.local.resetToken, (err, result) => {
          if (err) return res.send(err);

          if (Date.now() > user.local.resetTokenExpires) {
            return res.status(400).send('Reset token has expired');
          } else {
            if (!result) return res.status(400).send('Invalid token');

            user.local.resetToken = null;
            user.local.resetTokenExpires = null;
            return res.send(result);
          }
        });
      });
  });

  app.post('/api/reset', (req, res) => {

    User.findOne({ 'local.email': req.body.email })
      .then(user => {

        if (!user) return res.status(400).send('Invalid email');

        bcrypt.hash(req.body.password, 12)
          .then(hash => {

            if (Date.now() <= user.local.resetTokenExpires) {
              user.local.password = hash;

              user.save()
                .then(user => res.send(user));
            } else {
              return res.status(400).send('Token has expired');
            }
          });
      });
  });

  // Email verification link - check if token is valid and hasn't expired
  app.get('/api/verify/:email/:token', (req, res) => {

    User.findOne({ 'local.email': req.params.email })
      .then(user => {

        if (!user) return res.status(400).send('User not found');

        if (Date.now() >= user.local.verificationTokenExpires) {
          return res.status(400).send('Token has expired')
        } else {
          bcrypt.compare(req.params.token, user.local.verificationToken)
            .then(result => {

              if (!result) return res.status(400).send('Invalid token');

              user.active = true;

              user.save()
                .then(user => {
                  res.send(user)
                });
            });
        }
      });
  });

  // Resend verification token
  app.post('/api/verify', (req, res) => {

    const email = req.body.email;

    User.findOne({ 'local.email': email})
      .then(user => {

        if (!user) return res.status(400).send('User not found');

        if (user.active) return res.send('User already verified!')

        crypto.randomBytes(20, (err, buf) => {
          const token = buf.toString('hex');

          bcrypt.hash(token, 12)
            .then(hash => {
              user.local.verificationToken = hash;
              user.local.verificationTokenExpires = Date.now() + (1000 * 60 * 60);

              user.save()
                .then(user => {

                  sgMail.send(accountVerificationTemplate(req, token));
                  res.send('New token sent to your email')
                });
            });
        });
      });
  });
};
