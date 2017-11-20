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
    res.send(req.user);
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

    console.log('user:', req.user.id);
    console.log('IP:', ip.address());


    Poll.findOne({ title: title })
      .then(poll => {

        const option = poll.options.find(optionElement => {
          return optionElement.option === chosenOption;
        });

        console.log(option);

        getmac.getMac((err, mac) => {
          if (poll.voted.MACaddress.indexOf(mac) || poll.voted.IPaddress.indexOf(ip.address()) || poll.voted.userID.indexOf(req.user.id)) {
            console.log('You have already voted!')
          } else {
            console.log('Vote submitted');
            option.votes += 1;

            poll.voted.IPaddress.push(ip.address());
            poll.voted.MACaddress.push(mac);
            if (req.user.id) {
              poll.voted.userID.push(req.user.id);
            }
          }
        });


        poll.save();
        res.send(poll);
      });
  });
};
