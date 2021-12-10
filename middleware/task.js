const Task = require('../models/task');

exports.addTask = function (category, title, date, completed, notes, user) {
  const newTask = new Task({
    category: category,
    title: title,
    date: date,
    completed: completed,
    notes: notes,
    userId: user._id,
  });

  return newTask.save();
};

exports.deleteTask = function (taskId, deleteRepeatElements = false) {
  if (!deleteRepeatElements) {
    return Task.deleteOne({ _id: taskId });
  }
};

exports.editTask = function (taskId, category, title, date, completed, notes) {
  return Task.findById(taskId).then(task => {
    task.category = category;
    task.title = title;
    task.date = date;
    task.completed = completed;
    task.notes = notes;
    return task.save();
  });
};

exports.getDailyTasks = function (startDate, endDate, timeZoneOffset, user) {
  return Task.find({ userId: user._id }).then(tasks => {
    return tasks.filter(task => {
      const offsetDate = task.date - timeZoneOffset;
      return offsetDate > startDate && offsetDate < endDate;
    });
  });
};

exports.getCategoryTasks = function (category, user) {
  return Task.find({ userId: user._id }).then(tasks => {
    return tasks.filter(task => {
      return task.category == category;
    });
  });
};

exports.getTask = function (taskId) {
  task = Task.findById(str(taskId));
  console.log(task);
  return task;
};
