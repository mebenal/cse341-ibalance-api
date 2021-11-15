// Task format
//task[0]
//  "taskTitle" = ""
//  "taskCategory" = ""
//  "taskCompletionStatus" = False
//  "" time (possibly)
const Task = require('../models/task')

exports.getDailyTasks = (req, res, next) => { // gets all page data and users tasks
  const now = new Date();
  const today = new Date(now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate());
  const tomorrow = new Date(now.getFullYear()+'-'+(now.getMonth()+1)+'-'+(now.getDate()+1))
  console.log(today)
  console.log(tomorrow)
  console.log(user)
  Task.getTasks(today, tomorrow, req.user)
  .then(tasks => {
    //return res.status(422).send({
    return res.send({
      path: '/daily-tasks',
      pageTitle: 'Daily Tasks',
      date: 'date here',
      task: 'array of tasks', // has name and category color - Sam
    });
  })
  
  };
  
  exports.postAddNewTask = (req, res, next) => { // Creates a new task
    const taskTitle = req.body.taskTitle;
    const taskCategory = req.body.taskCategory;
    const taskCompletionStatus = False;
    res.redirect('/test123');
    // add task to mongodb through model stuff
  }

  exports.postDeleteTask = (req, res, next) => {
    res.redirect('/test234');
  }

  exports.postEditTask = (req, res, next) => {
    res.redirect('/test345');
  }