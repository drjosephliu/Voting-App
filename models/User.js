const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  local: {
    email: String,
    password: String,
    resetToken: String,
    resetTokenExpires: Date
  },
  google: {
    id: String
  },
  facebook: {
    id: String
  }
});

userSchema.methods.generateHash = (password, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(err);
    callback(null, hash);
  });
}

userSchema.methods.validPassword = function(password, callback) {
  bcrypt.compare(password, this.local.password, (err, res) => {
    if (err) return callback(err);
    callback(null, res);
  });
};

mongoose.model('users', userSchema);
