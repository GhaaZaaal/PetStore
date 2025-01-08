const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Product = require('../models/productModel');
const ApiError = require('../utils/apiError');

// @desc:   Create A New Product
// @route:  POST {API_V}/products
// @access: Private
exports.createProducts = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc:   Get A Specific Product
// @route:  GET {API_V}/products/:id
// @access: Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate({
    path: 'category',
    select: 'name -_id',
  });
  if (!product) {
    return next(new ApiError(`No Product For This Id ${id}`, 404));
  }
  console.log(product.name);

  res.status(200).json({ data: product });
});

// @desc:   Get A List Of Product
// @route:  GET {API_V}/products
// @access: Public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; // (3 - 1) * 5 = 10

  const product = await Product.find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: 'name -_id' });
  res.status(200).json({ results: product.length, page, data: product });
});

// @desc:   Update A Specific Product
// @route:  PUT {API_V}/products/:id
// @access: Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    return next(new ApiError(`No Product For This Id ${id}`, 404));
  }
  console.log(product.name);

  res.status(200).json({ data: product });
});

// @desc:   Delete A Specific Product
// @route:  DELETE {API_V}/products/:id
// @access: Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No Product For This Id ${id}`, 404));
  }

  res
    .status(200)
    .json({ data: `Product: ${product.name} Deleted Successfully ` });
});
