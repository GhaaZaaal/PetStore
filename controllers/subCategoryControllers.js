const SubCategory = require('../models/subCategoryModel');
const dry = require('./dontRepeatYourself');

exports.getCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};// Nested Route To Create SubCategory

exports.createFilterBody = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
};// Nested Route To Get SubCategory

// @desc:   Get A List Of Sub Categories
// @route:  GET {API_V}/subCategories
// @access: Public
exports.getSubCategories = dry.getAll(SubCategory);

// @desc:   Get A Specific SubCategory
// @route:  GET {API_V}/subCategories/:id
// @access: Public
exports.getSubCategory = dry.getOne(SubCategory);

// @desc:   Create A New SubCategory
// @route:  POST {API_V}/subCategories
// @access: Private
exports.createSubCategory = dry.createOne(SubCategory);

// @desc:   Update A Specific Sub Category
// @route:  PUT {API_V}/subCategories/:id
// @access: Private
exports.updateSubCategory = dry.updateOne(SubCategory);

// @desc:   Delete A Specific Sub Category
// @route:  DELETE {API_V}/subCategories/:id
// @access: Private
exports.deleteSubCategory = dry.deleteOne(SubCategory);
