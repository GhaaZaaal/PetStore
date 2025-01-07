const { validationResult } = require('express-validator');

// @desc: Find Validation Errors in Request & Wrap it to an Object
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validatorMiddleware;
