const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = require('./user');

const messageSchema = new Schema({
  toUserEmail: {
    type: String,
    ref: 'User',
    required: true,
  },
  fromUserEmail: {
    type: String,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timeSent: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Message', messageSchema);
