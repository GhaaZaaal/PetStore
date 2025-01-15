const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const dry = require('./dontRepeatYourself');
const { uploadSingleImage } = require('../middlewares/uploadImage');
const Brand = require('../models/brandModel');

exports.uploadBrandImage = uploadSingleImage('image');
// @desc:   Image Processing
// @access: Private
exports.resizeBrandImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpg`;

  await sharp(req.file.buffer)
    .resize(800, 800)
    .toFormat('jpg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);

  req.body.image = filename;
  // console.log('File Name:', filename);
  

  next();
});

// @desc:   Upload Category Image
// @access: Private

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
