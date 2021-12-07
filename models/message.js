const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = require('./user');

const messasgeSchema = new Schema({
  toUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fromUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Message', messageSchema);
