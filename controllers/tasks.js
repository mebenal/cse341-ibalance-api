const Task = require('../middleware/task');

exports.getDailyTasks = (req, res, next) => {
  // gets all page data and users tasks
  const now = new Date();
  const today = new Date(
    now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
  );
  const tomorrow = new Date(
    now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() + 1)
  );

  Task.getTasks(today, tomorrow, req.user).then(tasks => {
    return res.json({
      task: tasks, // has name and category color - Sam
    });
  });
};

exports.postAddNewTask = (req, res, next) => {
  // Creates a new task
  const taskTitle = req.body.taskTitle;
  const taskCategory = req.body.taskCategory;
  const taskCompletionStatus = false;
  const taskDate = new Date(req.body.taskDate);
  const taskNotes = req.body.taskNotes;
  Task.addTask(
    taskCategory,
    taskTitle,
    taskDate,
    taskCompletionStatus,
    taskNotes,
    req.user
  ).then(saved => {
    res.json({ success: saved });
  });
};

exports.postDeleteTask = (req, res, next) => {
  const taskId = req.body.taskId;
  Task.deleteTask(taskId).then(deleted => {
    res.json({ success: Boolean(deleted.deletedCount) });
  });
};

exports.postEditTask = (req, res, next) => {
  const taskId = req.body.taskId;
  const taskTitle = req.body.taskTitle;
  const taskCategory = req.body.taskCategory;
  const taskCompletionStatus = req.body.taskCompletionStatus;
  const taskDate = new Date(req.body.taskDate);
  const taskNotes = req.body.taskNotes;
  console.log(typeof taskCompletionStatus);
  Task.editTask(
    taskId,
    taskCategory,
    taskTitle,
    taskDate,
    taskCompletionStatus,
    taskNotes
  ).then(edited => {
    res.json({ success: edited });
  });
};
