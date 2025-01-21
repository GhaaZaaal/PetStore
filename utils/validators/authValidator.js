const slugify = require('slugify');
const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');
const ApiError = require('../apiError');

exports.singUpValidator = [
  check('name')
    .notEmpty()
    .withMessage('User Name Required')
    .isLength({ min: 3 })
    .withMessage('Too Short User Name')
    .isLength({ max: 32 })
    .withMessage('Too Long User Name')
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),

  check('email')
    .notEmpty()
    .withMessage('User Email Required')
    .isEmail()
    .withMessage('Invalid Email Format')
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject(new ApiError('Email Already In Use', 400));
        }
      })
    ),

  check('password')
    .notEmpty()
    .withMessage('User Password Required')
    .isLength({ min: 8 })
    .withMessage('Too Short Password')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new ApiError('Passwords Do Not Match', 400);
      }
      return true;
    }),

  check('passwordConfirm').notEmpty().withMessage('Password Confirm Required'),

  validatorMiddleware,
];

exports.loginValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email Required')
    .isEmail()
    .withMessage('Invalid Email Format'),
  check('password').notEmpty().withMessage('Password Required'),

  validatorMiddleware,
];
