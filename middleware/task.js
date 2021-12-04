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
  console.log(date);
  let newTask;
  if (repeat) {
    newTask = new Task({
      category: category,
      title: title,
      date: date,
      completed: completed,
      notes: notes,
      userId: user._id,
      repeat: new Repeat({ user: user._id })._id,
    });
  } else {
    newTask = new Task({
      category: category,
      title: title,
      date: date,
      completed: completed,
      notes: notes,
      userId: user._id,
    });
  }

  return newTask.save();
};

module.exports.deleteTask = function (taskId, deleteRepeatElements = false) {
  if (!deleteRepeatElements) {
    return Task.deleteOne({ _id: taskId });
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
  return Task.findById(taskId).then(task => {
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
