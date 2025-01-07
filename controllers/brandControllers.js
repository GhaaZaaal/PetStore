const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Brand = require('../models/brandModel');
const ApiError = require('../utils/apiError');

// @desc:   Create A New Brands
// @route:  POST {API_V}/brands
// @access: Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log(name);

  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc:   Get A Specific Brand
// @route:  GET {API_V}/brands/:id
// @access: Public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`No Brand For This Id ${id}`, 404));
  }
  console.log(brand.name);

  res.status(200).json({ data: brand });
});

// @desc:   Get A List Of Brands
// @route:  GET {API_V}/brands
// @access: Public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; // (3 - 1) * 5 = 5
  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

// @desc:   Update A Specific Brand
// @route:  PUT {API_V}/brands/:id
// @access: Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { name } = req.body;

  const brand = await Brand.findOneAndUpdate({ _id: id }, { name, slug: slugify(name) }, { new: true });
  if (!brand) {
    return next(new ApiError(`No Brand For This Id ${id}`, 404));
  }
  console.log(brand.name);

  res.status(200).json({ data: brand });
});

// @desc:   Delete A Specific Brand
// @route:  DELETE {API_V}/brands/:id
// @access: Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`No Brand For This Id ${id}`, 404));
  }
  console.log(brand.name);

  res.status(200).json({ data: `Brand ${brand.name} Deleted Successfully ` });

});

// method 3 and final
// async await
// method 2
// Brand.create({ name, slug: slugify(name) })
//   .then((Brand) => res.status(201).json({ data: Brand }))
//   .catch((err) => res.status(400).send(err));
// method 1
// const newBrand = new Brand({ name });
// newBrand
//   .save()
//   .then((doc) => {
//     res.json(doc);
//   })
//   .catch((err) => {
//     res.json(err);
//   });
