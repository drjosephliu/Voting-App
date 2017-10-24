const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');

const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

sgMail.setApiKey(keys.sendGridKey);



module.exports = app => {
  app.post(
    '/api/signup',
    passport.authenticate('local-signup'),
    (req, res) => {

      const user = {
        user: req.user,
        msg: 'You have successfully signed up!'
      };
      res.send(user);
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.post(
    '/api/login',
    passport.authenticate('local-login'),
    (req, res) => {
      console.log(req.user);
      const user = {
        user: req.user,
        msg: `Welcome back ${req.user.local.email}!`
      };

      res.send(user);
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

        if(!user) {
          return res.status(422).send('No account with that email address exists');
        }

        crypto.randomBytes(20, (err, buf) => {
          var token = buf.toString('hex');

          bcrypt.hash(token, 12, (err, tokenHash) => {
            user.local.resetToken = tokenHash;
            user.local.resetTokenExpires = Date.now() + (1000 * 60 * 60);

            user.save()
              .then(user => {
                console.log('saved user:', user);
              });
          });

          const msg = {
            to: req.body.email,
            from: 'reset-password@drhectapus.com',
            subject: 'Reset Your Password',
            html: `
              <p>Hello.</p>

              <p>Looks like you have forgotten your password</p>

              <p>Thankfully, you can reset your password by following this link:</p>

              <p><a href='http://${req.headers.host}/reset/${req.body.email}/${token}'>Reset Password</a></p>

              <p>- DrHectapus</p>
            `
          };
          sgMail.send(msg);
          res.send('We have sent you a reset link to your email');
        });
      });
  });

  app.get('/api/reset/:email/:token', (req, res) => {
    User.findOne({ 'local.email': req.params.email })
      .then(user => {
        if (!user) return res.status(422).send('User not found');

        bcrypt.compare(req.params.token, user.local.resetToken, (err, result) => {
          if (err) return res.send(err);
          res.send(result);
        });
      });
  });


};
