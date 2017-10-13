const passport = require('passport');

module.exports = app => {
  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: true
    }));
};
