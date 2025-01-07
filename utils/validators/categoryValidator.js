const { param, check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getCategoryValidator = [param('id').isMongoId().withMessage('Invalid Category ID Format'), validatorMiddleware];

exports.createCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('Category Required')
    .isLength({ min: 3 })
    .withMessage('Too Short Category Name')
    .isLength({ max: 32 })
    .withMessage('Too Long Category Name'),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Category ID Format'),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Category ID Format'),
  validatorMiddleware,
];
