const slugify = require('slugify');
const { param, check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/categoryModel');

exports.createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('SubCategory Required')
    .isLength({ min: 2 })
    .withMessage('Too Short SubCategory Name')
    .isLength({ max: 32 })
    .withMessage('Too Long SubCategory Name')
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check('category')
    .notEmpty()
    .withMessage('Main Category is Required')
    .isMongoId()
    .withMessage('Invalid Category ID Format')
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`Category: ${categoryId} Not Found!!!`)
          );
        }
      })
    ),
  validatorMiddleware,
];

exports.getSubCategoryValidator = [
  param('id').isMongoId().withMessage('Invalid SubCategory ID Format'),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check('id')
    .notEmpty()
    .isMongoId()
    .withMessage('Invalid SubCategory ID Format'),
  check('name')
    .notEmpty()
    .withMessage('Name Must Be Valid')
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check('id')
    .notEmpty()
    .isMongoId()
    .withMessage('Invalid SubCategory ID Format'),
  validatorMiddleware,
];
