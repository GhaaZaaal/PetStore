const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

const SubCategory = require('../models/subCategoryModel');

// @desc:   Create A New SubCategory
// @route:  POST {API_V}/subCategories
// @access: Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  console.log(name);
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// @desc:   Get A List Of Sub Categories
// @route:  GET {API_V}/subCategories
// @access: Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; // (3 - 1) * 5 = 5
  const subCategories = await SubCategory.find({}).skip(skip).limit(limit);
  // .populate({ path: 'category', select: 'name -_id' });
  res.status(200).json({ results: subCategories.length, page, data: subCategories });
});

// @desc:   Get A Specific SubCategory
// @route:  GET {API_V}/subCategories/:id
// @access: Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findById(id);
  // .populate({ path: 'category', select: 'name -_id' });
  if (!subCategory) {
    return next(new ApiError(`No Sub Category For This Id ${id}`, 404));
  }
  console.log(subCategory.name);

  res.status(200).json({ data: subCategory });
});

// @desc:   Update A Specific Sub Category
// @route:  PUT {API_V}/subCategories/:id
// @access: Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { name, category } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  // .populate({ path: 'category', select: 'name -_id' });
  if (!subCategory) {
    return next(new ApiError(`No Sub Category For This Id ${id}`, 404));
  }
  console.log(subCategory.name);

  res.status(200).json({ data: subCategory });
});

// @desc:   Delete A Specific Sub Category
// @route:  DELETE {API_V}/subCategories/:id
// @access: Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`No Sub Category For This Id ${id}`, 404));
  }
  console.log(subCategory.name);

  res.status(200).json({ data: `Sub Category ${subCategory.name} Deleted Successfully ` });
});

