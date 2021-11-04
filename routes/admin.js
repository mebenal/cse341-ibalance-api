const express = require('express');
// const { body } = require('express-validator');

// const authController = require('../controllers/auth');
// const User = require('../models/user');

// const router = express.Router();
// const { body } = require('express-validator');

// const authController = require('../controllers/auth');
const adminController = require('../controllers/admin');
// const User = require('../models/user');

const router = express.Router();

// router.get('/daily-tasks', tasksController.getDailyTasks)
router.get('/admin', adminController.getAdminView)


module.exports = router;