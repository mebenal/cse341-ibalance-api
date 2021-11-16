const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = require('./user')
const Repeat = require('./repeat')

const taskSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: ['physical', 'spiritual', 'intellectual', 'social']
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  repeatId: {
    type: Schema.Types.ObjectId,
    ref: 'Repeat',
  },
  notes: String,
});

module.exports = mongoose.model('Task', taskSchema)