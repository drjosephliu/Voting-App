const mongoose = require('mongoose');
const { Schema } = mongoose;
const OptionSchema = require('./Option');

const pollSchema = new Schema({
  title: String,
  options: [OptionSchema],
  dateCreated: { type: Date, default: Date.now() },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  voted: {
    userID: [String],
    IPaddress: [String],
    MACaddress: [String]
  }
});

mongoose.model('polls', pollSchema);
