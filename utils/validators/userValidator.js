const slugify = require('slugify');
const { param, check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');
const ApiError = require('../apiError');

exports.createUserValidator = [
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
    .custom((value, { req }) => {
      req.body.email = value.toLowerCase();
      return true;
    })
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject(new ApiError('Email Already Exists', 400));
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
  check('address').optional(),
  check('phone').optional().isMobilePhone(['ar-EG']),
  check('profileImage').optional(),

  check('roles').optional(),

  validatorMiddleware,
];

exports.getUserValidator = [
  param('id').isMongoId().withMessage('Invalid User ID Format'),
  validatorMiddleware,
];

// ! Future Enhancement: Add More Validation Rules
exports.updateUserValidator = [
  check('id').isMongoId().withMessage('Invalid User ID Format'),
  check('name')
    .optional()
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid Email Format')
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject(new ApiError('Email Already Exists', 400));
        }
      })
    ),

  check('address').optional(),
  check('phone').optional().isMobilePhone(['ar-EG']),
  check('profileImage').optional(),

  check('roles').optional(),
  validatorMiddleware,
];

exports.updatePasswordValidator = [
  check('id').isMongoId().withMessage('Invalid User ID Format'),
  check('oldPassword').notEmpty().withMessage('Old Password Required'),
  check('password')
    .notEmpty()
    .withMessage('New Password Required')
    .isLength({ min: 8 })
    .withMessage('Too Short Password')
    .custom(async (password, { req }) => {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new ApiError('User Not Found', 404);
      }

      if (!(await user.comparePassword(req.body.oldPassword, user.password))) {
        throw new ApiError('Old Password Is Incorrect', 400);
      }

      if (password !== req.body.passwordConfirm) {
        throw new ApiError('Passwords Do Not Match', 400);
      }
      return true;
    }),
  check('passwordConfirm').notEmpty().withMessage('Password Confirm Required'),

  validatorMiddleware,
];

exports.deleteUserValidator = [
  check('id').isMongoId().withMessage('Invalid User ID Format'),
  validatorMiddleware,
];

// ! Future Enhancement: Add More Validation Rules
exports.UpdateLoggedUserDataValidator = [
  check('name')
    .optional()
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check('email')
    .notEmpty()
    .withMessage('Email Required')
    .isEmail()
    .withMessage('Invalid Email Format')
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject(new ApiError('Email Already Exists', 400));
        }
      })
    ),

  check('address').optional(),
  check('phone')
    .optional()
    .isMobilePhone(['ar-EG'])
    .withMessage('Invalid Mobile Number'),

  validatorMiddleware,
];
