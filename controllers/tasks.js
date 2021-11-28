// Task format
//task[0]
//  "taskTitle" = ""
//  "taskCategory" = ""
//  "taskCompletionStatus" = False
//  "" time (possibly)
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
      path: '/daily-tasks',
      pageTitle: 'Daily Tasks',
      date: new Date(),
      task: tasks, // has name and category color - Sam
      _csrf: req.csrfToken(),
    });
  });
};

exports.postAddNewTask = (req, res, next) => {
  // Creates a new task
  const taskTitle = req.body.taskTitle;
  const taskCategory = req.body.taskCategory;
  const taskCompletionStatus = false;
  const taskDueDate = new Date(req.body.taskDate);
  const taskNotes = req.body.taskNotes;
  const taskRepeats = req.body.taskRepeat;
  Task.addTask(
    taskCategory,
    taskTitle,
    taskDueDate,
    taskCompletionStatus,
    taskNotes,
    req.user,
    taskRepeats
  ).then(saved => {
    res.json({saved:saved})
  });
};

exports.postDeleteTask = (req, res, next) => {
  const taskId = req.body.taskId;
  Task.deleteTask(taskId)
  .then(deleted =>{
    res.json({deleted:deleted})
  })
};

exports.postEditTask = (req, res, next) => {
  const taskId = req.body.taskId;
  const taskTitle = req.body.taskTitle;
  const taskCategory = req.body.taskCategory;
  const taskCompletionStatus = false;
  const taskDueDate = req.body.taskDate;
  const taskNotes = req.body.taskNotes;
  Task.editTask(taskId, taskCategory, taskTitle, taskDueDate, taskCompletionStatus, taskNotes)
  .then(edited => {
    res.json({edited:edited});
  })
};
