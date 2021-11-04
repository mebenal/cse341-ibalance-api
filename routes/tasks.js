const express = require('express');
// const { body } = require('express-validator');

// const authController = require('../controllers/auth');
// const User = require('../models/user');

// const router = express.Router();
// const { body } = require('express-validator');

// const authController = require('../controllers/auth');
const tasksController = require('../controllers/tasks');
// const User = require('../models/user');

const router = express.Router();

router.get('/daily-tasks', tasksController.getDailyTasks)

router.post('/add-task', tasksController.postAddNewTask)

router.post('/edit-task', tasksController.postEditTask)

router.post('/delete-task', tasksController.postDeleteTask)


module.exports = router;