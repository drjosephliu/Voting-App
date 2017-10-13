const passport = require('passport');

module.exports = app => {
  app.post(
    '/register',
    passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup'
    }));
};
