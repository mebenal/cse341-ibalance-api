const Task = require('../models/task');
const Repeat = require('../models/repeat');

module.exports.addTask = function (
  category,
  title,
  date,
  completed,
  notes,
  user,
  repeat
) {
  let repeatId;
  if (repeat) {
    repeatId = new Repeat({ user: user._id });
  } else {
    repeatId = null;
  }
  console.log(user);
  console.log(repeatId);
  const newTask = new Task({
    category: category,
    title: title,
    date: date,
    completed: completed,
    notes: notes,
    userId: user._id,
    repeat: repeatId,
  });
  return newTask.save();
};

module.exports.deleteTask = function (taskId, deleteRepeatElements = false) {
  if (!deleteRepeatElements) {
    Task.deleteOne({ _id: taskId });
  } else {
    Task.findById(taskId).then(task => {
      if (task.repeatId) {
        Task.deleteMany({ repeatId: task.repeatId });
      }
    });
  }
};

module.exports.editTask = function (
  taskId,
  category,
  title,
  date,
  completed,
  notes
) {
  Task.findById(taskId).then(task => {
    task.category = category;
    task.title = title;
    task.date = date;
    task.completed = completed;
    task.notes = notes;
    return task.save();
  });
};

module.exports.getTasks = function (startDate, endDate, user) {
  return Task.find({
    date: { $gte: startDate, $lte: endDate },
    userId: user._id,
  });
};

module.exports.getTask = function (taskId) {
  task = Task.findById(str(taskId));
  console.log(task);
  return task;
};
