const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  toUserEmail: {
    type: String,
    required: true,
  },
  fromUserEmail: {
    type: String,
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
