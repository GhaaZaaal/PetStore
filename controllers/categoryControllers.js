const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const dry = require('./dontRepeatYourself');
const { uploadSingleImage } = require('../middlewares/uploadImage');
const Category = require('../models/categoryModel');

// @desc:   Image Processing
// @access: Private
exports.resizeCategoryImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  
  const filename = `category-${uuidv4()}-${Date.now()}.jpg`;
  
  await sharp(req.file.buffer)
  .resize(800, 800)
  .toFormat('jpg')
  .jpeg({ quality: 95 })
  .toFile(`uploads/categories/${filename}`);
  console.log('File Buffer:', req.file.buffer);
  
  req.body.image = filename;
  next();
});

// @desc:   Upload Category Image
// @access: Protected-Private/Admin-Manager
exports.uploadCategoryImage = uploadSingleImage('image');

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
// @access: Protected-Private/Admin-Manager
exports.createCategories = dry.createOne(Category);

// @desc:   Update A Specific Category
// @route:  PUT {API_V}/categories/:id
// @access: Protected-Private/Admin-Manager
exports.updateCategory = dry.updateOne(Category);

// @desc:   Delete A Specific Category
// @route:  DELETE {API_V}/categories/:id
// @access: Protected-Private/Admin
exports.deleteCategory = dry.deleteOne(Category);
