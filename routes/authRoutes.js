const passport = require('passport');

module.exports = app => {
  app.post(
    '/api/signup',
    passport.authenticate('local-signup', {
      failureFlash: true
    }),
    (req, res) => {
      console.log('request:', req);
      console.log('flash msg:', req.flash('signUpMessage'));
      res.send(req.user);
    }
  );

  app.get('/api/current_user', (req, res) => {
    console.log('current_user:', req.user);
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
