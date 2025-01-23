const express = require('express');
const {
  singUpValidator,
  loginValidator,
} = require('../utils/validators/authValidator');

const {
  singUp,
  login,
  // forgetPassword,
} = require('../controllers/authControllers');

const router = express.Router();

router.post('/signup', singUpValidator, singUp);
router.post('/login', loginValidator, login);
// router.post('/forgetPassword', forgetPassword);

module.exports = router;
