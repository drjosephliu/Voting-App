const mongoose = require('mongoose');
const Poll = mongoose.model('polls');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/polls', requireLogin, (req, res) => {

    const { title, options } = req.body;

    const poll = new Poll({
      title,
      options: options.map(option => ({ option: option.trim() })),
      dateCreated: Date.now(),
      _user: req.user.id
    });

    poll.save();
    res.send(req.user);
  });

  app.get('/api/mypolls/:skip', requireLogin, (req, res) => {

    console.log(req.params.skip);

    Poll.find({ _user: req.user.id })
      .sort({ dateCreated: -1 })
      .skip(parseInt(req.params.skip))
      .limit(4)
      .then(polls => {
        res.send(polls);
      });
  });
};
