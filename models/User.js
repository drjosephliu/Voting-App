const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  active: { type: Boolean, default: false },
  local: {
    email: String,
    password: String,
    resetToken: String,
    resetTokenExpires: Date,
    verificationToken: String,
    verificationTokenExpires: Date
  },
  google: {
    id: String
  },
  facebook: {
    id: String
  }
});


mongoose.model('users', userSchema);
