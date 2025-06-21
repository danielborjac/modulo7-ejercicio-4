const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');
const sanitize = require('../middlewares/sanitizeMiddleware');

const router = express.Router();

// Todas estas rutas están protegidas con JWT
router.use(auth);

router.get('/tasks', getTasks);

router.post(
  '/tasks',
  [body('title').notEmpty(), sanitize],
  createTask
);

router.put(
  '/tasks/:id',
  [body('title').optional(), body('completed').optional().isBoolean(), sanitize],
  updateTask
);

router.delete('/tasks/:id', deleteTask);

module.exports = router;