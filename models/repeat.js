const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = require('./user')

const repeatSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

module.exports = mongoose.model('Task', userSchema)