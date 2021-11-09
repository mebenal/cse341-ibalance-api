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
    required: true
  },
  notes: String,
});

taskSchema.methods.addTask = function (category, title, date, completed, notes, user, repeat) {

}

taskSchema.methods.deleteTask = function (taskId, deleteRepeatElements=false) {

}

taskSchema.methods.editTask = function (taskId, title, date, completed, notes) {

}

taskSchema.methods.getTasks = function (startDate, endDate, user) {

}

taskSchema.methods.getTask = function (taskId) {
  
}

module.exports = mongoose.model('Task', taskSchema)