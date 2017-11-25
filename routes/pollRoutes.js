const mongoose = require('mongoose');
const Poll = mongoose.model('polls');
const requireLogin = require('../middlewares/requireLogin');
const ip = require('ip');
const getmac = require('getmac');

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
    res.send(poll);
  });

  app.get('/api/mypolls/:skip', requireLogin, (req, res) => {

    Poll.find({ _user: req.user.id })
      .sort({ dateCreated: -1 })
      .skip(parseInt(req.params.skip))
      .limit(4)
      .then(polls => {
        res.send(polls);
      });
  });

  app.post('/api/poll', (req, res) => {
    const { title, chosenOption } = req.body;

    Poll.findOne({ title: title })
      .then(poll => {

        const option = poll.options.find(optionElement => {
          return optionElement.option === chosenOption;
        });


        getmac.getMac((err, mac) => {
          if (poll.voted.MACaddress.indexOf(mac) === -1 || poll.voted.IPaddress.indexOf(ip.address()) === -1 || poll.voted.userID.indexOf(req.user.id) === -1) {


            if (poll._user == req.user.id) {
              return res.status(400).send("You can't vote on your own poll!");
            }

            console.log('option:', option);
            option.votes += 1;

            poll.voted.IPaddress.push(ip.address());
            poll.voted.MACaddress.push(mac);
            if (req.user.id) {
              poll.voted.userID.push(req.user.id);
            }

            poll.save();
            res.send(poll);

          } else {
            res.status(400).send('You have already voted')
          }
        });
      });
  });

  app.get('/api/allpolls/:skip', (req, res) => {

    function checkUser() {
      console.log('user:', req.user);
      if (!req.user) {
        return {};
      } else {
        return { _user: { $ne: req.user.id } };
      }
    }

    if (!req.user) {
      Poll.find({})
        .sort({ dateCreated: -1 })
        .skip(parseInt(req.params.skip))
        .limit(4)
        .then(polls => {
          return res.send(polls)
        });
    } else {
      Poll.find({ _user: { $ne: req.user.id } })
        .sort({ dateCreated: -1 })
        .skip(parseInt(req.params.skip))
        .limit(4)
        .then(polls => {
          res.send(polls);
        });
    }


  });

  app.delete('/api/poll/:id', (req, res) => {
    Poll.findByIdAndRemove(req.params.id)
      .exec()
      .then(poll => {
        if (!poll) return res.status(404).send('Poll not found!');
        console.log('delete:', poll);
        return res.send(poll);
      });
  })
};
