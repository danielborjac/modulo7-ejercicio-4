const { validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

const sanitize = (req, res, next) => {
  // Validaciones
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  // Sanitización básica
  for (let field in req.body) {
    if (typeof req.body[field] === 'string') {
      req.body[field] = sanitizeHtml(req.body[field], {
        allowedTags: [],
        allowedAttributes: {},
      });
    }
  }

  next();
};

module.exports = sanitize;