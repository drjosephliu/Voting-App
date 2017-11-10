const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollSchema = new Schema({
  title: String,
  options: [{ option: String, votes: Number }],
  date: { type: Date, default: Date.now() },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('polls', pollSchema);
