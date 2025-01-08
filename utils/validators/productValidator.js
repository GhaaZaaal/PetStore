const { check } = require('express-validator');
const SubCategory = require('../../models/subCategoryModel');
const Category = require('../../models/categoryModel');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createProductValidator = [
  check('title')
    .isLength({ min: 3 })
    .withMessage('Too Short Product Title')
    .notEmpty()
    .withMessage('Name is Required'),
  check('description')
    .notEmpty()
    .withMessage('Product Description is Required')
    .isLength({ max: 2000 })
    .withMessage('Description is Too Long'),
  check('quantity')
    .notEmpty()
    .withMessage('Quantity is Required')
    .isNumeric()
    .withMessage('Quantity Must be a Number'),
  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Sold Number Must be a Number'),
  check('price')
    .notEmpty()
    .withMessage('Price is Required')
    .isNumeric()
    .withMessage('Price Must be a Number')
    .isLength({ max: 10000 })
    .withMessage('Price is Too Long'),
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product Price After Discount Must be a Number')
    .isFloat()
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error('Price After Discount Must be Less Than Price');
      }
      return true;
    }),
  check('availableColors')
    .optional()
    .isArray()
    .withMessage('Colors Must be an Array of Strings'),
  check('imageCover')
    .notEmpty()
    .withMessage('Product Image Cover is Required To Show'),
  check('images')
    .optional()
    .isArray()
    .withMessage('Images Must be an Array of Strings'),
  check('category')
    .notEmpty()
    .withMessage("Product's Main Category is Required")
    .isMongoId()
    .withMessage('Category ID Must be Valid')
    // Check if Category Exists
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`Category: ${categoryId} Not Found!!!`)
          );
        }
      })
    ),
  check('subCategories')
    .optional()
    .isMongoId()
    .withMessage('Sub Category ID Must be Valid')
    // Check The Array Of SubCategories If Exists
    .custom((subCategoriesId) =>
      SubCategory.find({ _id: { $exists: true, $in: subCategoriesId } }).then(
        (subCategory) => {
          if (!subCategory || subCategory.length !== subCategoriesId.length) {
            return Promise.reject(
              new Error(`Category: ${subCategoriesId} Not Found!!!!!!!!`)
            );
          }
        }
      )
    )
    .custom((value, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subCategories) => {
          const subCategoriesIdInDb = [];
          subCategories.forEach((subCategory) => {
            subCategoriesIdInDb.push(subCategory._id.toString());
          });
          if (!value.every((val) => subCategoriesIdInDb.includes(val)))
            return Promise.reject(
              new Error(`Category:  Not Belong To The Same Main Category!`)
            );
        }
      )
    ),
  check('brand').optional().isMongoId().withMessage('Brand ID Must be Valid'),
  check('rateAverage')
    .optional()
    .isNumeric()
    .withMessage('Rating Must be a Number')
    .isFloat({ min: 1 })
    .withMessage('Rating Must be Above or Equal To 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating Must be Equal To or Below 5.0'),
  check('ratingsCount')
    .optional()
    .isNumeric()
    .withMessage('Ratings Count Must be a Number'),

  validatorMiddleware,
];

exports.getProductValidator = [
  check('id')
    .notEmpty()
    .withMessage('Product ID is Required')
    .isMongoId()
    .withMessage('Product ID Must be Valid'),

  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id')
    .notEmpty()
    .withMessage('Product ID is Required')
    .isMongoId()
    .withMessage('Product ID Must be Valid'),

  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id')
    .notEmpty()
    .withMessage('Product ID is Required')
    .isMongoId()
    .withMessage('Product ID Must be Valid'),

  validatorMiddleware,
];
