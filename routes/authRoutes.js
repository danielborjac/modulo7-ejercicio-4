const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const sanitize = require('../middlewares/sanitizeMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').notEmpty().isAlphanumeric(),
    body('password').isLength({ min: 6 }),
    sanitize,
  ],
  register
);

router.post(
  '/login',
  [
    body('username').notEmpty(),
    body('password').notEmpty(),
    sanitize,
  ],
  login
);

module.exports = router;