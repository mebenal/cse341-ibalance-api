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

taskSchema.methods.addTask = function (category, title, date, completed, notes, user, repeat) {
  let repeatId;
  if (repeat) {
    repeatId = new Repeat({user:user._id})
  } else {
    repeatId = null
  }
  const newTask = new Task({category:category,title:title,date:date,completed:completed,notes:notes,user:user._id,repeat:repeatId})
  return newTask.save()
}

taskSchema.methods.deleteTask = function (taskId, deleteRepeatElements=false) {
  if (!deleteRepeatElements) {
    Task.deleteOne({_id:taskId})
  } else {
    Task.findById(taskId)
    .then(task => {
      if (task.repeatId) {
        Task.deleteMany({repeatId:task.repeatId})
      }
    })
  }
}

taskSchema.methods.editTask = function (taskId, category, title, date, completed, notes) {
  Task.findById(taskId)
  .then(task => {
    task.category = category
    task.title = title
    task.date = date
    task.completed = completed
    task.notes = notes
    return task.save()
  })
}

taskSchema.methods.getTasks = async function (startDate, endDate, user) {
  console.log(user)
  return await Task.find({date :{$gte: startDate, $lte: endDate}, userId:user._id})
}

taskSchema.methods.getTask = async function (taskId) {
  task = await Task.findById(str(taskId))
  console.log(task)
  return task
}

module.exports = mongoose.model('Task', taskSchema)