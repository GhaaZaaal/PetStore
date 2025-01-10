const Category = require('../models/categoryModel');
const dry = require('./dontRepeatYourself');

// @desc:   Get A List Of Category
// @route:  GET {API_V}/categories
// @access: Public
exports.getCategories = dry.getAll(Category);

// @desc:   Get A Specific Category
// @route:  GET {API_V}/categories/:id
// @access: Public
exports.getCategory = dry.getOne(Category);

// @desc:   Create A New Category
// @route:  POST {API_V}/categories
// @access: Private
exports.createCategories = dry.createOne(Category);

// @desc:   Update A Specific Category
// @route:  PUT {API_V}/categories/:id
// @access: Private
exports.updateCategory = dry.updateOne(Category);

// @desc:   Delete A Specific Category
// @route:  DELETE {API_V}/categories/:id
// @access: Private
exports.deleteCategory = dry.deleteOne(Category);
