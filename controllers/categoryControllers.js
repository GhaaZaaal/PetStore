const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Category = require('../models/categoryModel');
const ApiError = require('../utils/apiError');

// @desc:   Create A New Category
// @route:  POST {API_V}/categories
// @access: Private
exports.createCategories = asyncHandler(async (req, res, next) => {
  const {name} = req.body;
  console.log(name);

  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc:   Get A Specific Category
// @route:  GET {API_V}/categories/:id
// @access: Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`No Category For This Id ${id}`, 404));
  }
  console.log(category.name);

  res.status(200).json({ data: category });
});

// @desc:   Update A Specific Category
// @route:  PUT {API_V}/categories/:id
// @access: Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { name } = req.body;

  const category = await Category.findOneAndUpdate({ _id: id }, { name, slug: slugify(name) }, { new: true });
  if (!category) {
    return next(new ApiError(`No Category For This Id ${id}`, 404));
  }
  console.log(category.name);

  res.status(200).json({ data: category });
});

// @desc:   Delete A Specific Category
// @route:  DELETE {API_V}/categories/:id
// @access: Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`No Category For This Id ${id}`, 404));
  }
  console.log(category.name);

  res.status(200).send();
});

// @desc:   Get A List Of Category
// @route:  GET {API_V}/categories
// @access: Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; // (3 - 1) * 5 = 5
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// method 3 and final
// async await
// method 2
// Category.create({ name, slug: slugify(name) })
//   .then((category) => res.status(201).json({ data: category }))
//   .catch((err) => res.status(400).send(err));
// method 1
// const newCategory = new Category({ name });
// newCategory
//   .save()
//   .then((doc) => {
//     res.json(doc);
//   })
//   .catch((err) => {
//     res.json(err);
//   });
