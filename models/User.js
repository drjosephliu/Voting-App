const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  local: {
    email: String,
    password: String
  }
});

mongoose.model('users', userSchema);
