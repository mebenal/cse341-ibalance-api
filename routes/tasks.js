const express = require('express');

const tasksController = require('../controllers/tasks');

const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

const router = express.Router();

router.get('/daily-tasks', isAuth, tasksController.getDailyTasks);

router.get('/categoty-tasks/:category', tasksController.getCategoryTasks);

router.post('/add-task', isAuth, tasksController.postAddNewTask);

router.post('/edit-task', isAuth, tasksController.postEditTask);

router.post('/delete-task', isAuth, tasksController.postDeleteTask);

module.exports = router;
