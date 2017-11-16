const mongoose = require('mongoose');
const { Schema } = mongoose;

const optionSchema = new Schema({
  option: String,
  votes: { type: Number, default: 0 }
});

module.exports = optionSchema;
