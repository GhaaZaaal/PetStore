const { param, check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Review = require('../../models/reviewModel');
const ApiError = require('../apiError');

exports.createReviewValidator = [
  check('title').optional(),
  check('ratings')
    .notEmpty()
    .withMessage('Ratings Value Required')
    .isFloat({
      min: 1,
      max: 5,
    })
    .withMessage('Rating Value Must Be Between 1.0 to 5.0'),
  check('user').isMongoId().withMessage('Invalid User ID Format'),
  check('product')
    .isMongoId()
    .withMessage('Invalid Product ID Format')
    .custom((value, { req }) =>
      // Check If The Same User Have Reviewed The Same Product Before
      Review.findOne({ user: req.user._id, product: req.body.product }).then(
        (review) => {
          if (review) {
            return Promise.reject(
              new ApiError('You Already Reviewed This Product')
            );
          }
        }
      )
    ),

  validatorMiddleware,
];

exports.getReviewValidator = [
  param('id').isMongoId().withMessage('Invalid Review ID Format'),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review ID Format')
    .custom((value, { req }) =>
      // Check Review OwnerShip Before Update
      Review.findById(value).then((review) => {
        if (!review) {
          return Promise.reject(new ApiError('Their Is No Review Selected'));
        }
        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new ApiError('You Are Not Allowed To Perform This Action')
          );
        }
      })
    ),
  check('title').optional(),
  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review ID Format')
    .custom((value, { req }) => {
      if (req.user.roles === 'user') {
        // Check Review OwnerShip Before Update
        return Review.findById(value).then((review) => {
          if (!review) {
            return Promise.reject(new ApiError('Their Is No Review Selected'));
          }
          // console.log(review.user.name);
          // console.log(req.user.name);
          
          if (review.user.name !== req.user.name) {
            return Promise.reject(
              new ApiError('You Are Not Allowed To Perform This Action')
            );
          }
        });
      }
      return true;
    }),

  validatorMiddleware,
];
