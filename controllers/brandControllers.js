const Brand = require('../models/brandModel');
const dry = require('./dontRepeatYourself');

// @desc:   Get A List Of Brands
// @route:  GET {API_V}/brands
// @access: Public
exports.getBrands = dry.getAll(Brand);

// @desc:   Get A Specific Brand
// @route:  GET {API_V}/brands/:id
// @access: Public
exports.getBrand = dry.getOne(Brand);

// @desc:   Create A New Brands
// @route:  POST {API_V}/brands
// @access: Private
exports.createBrand = dry.createOne(Brand);

// @desc:   Update A Specific Brand
// @route:  PUT {API_V}/brands/:id
// @access: Private
exports.updateBrand = dry.updateOne(Brand);

// @desc:   Delete A Specific Brand
// @route:  DELETE {API_V}/brands/:id
// @access: Private
exports.deleteBrand = dry.deleteOne(Brand);
