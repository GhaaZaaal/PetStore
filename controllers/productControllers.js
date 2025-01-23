const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const { uploadMultipleImages } = require('../middlewares/uploadImage');
const dry = require('./dontRepeatYourself');
const Product = require('../models/productModel');



exports.uploadProductImages = uploadMultipleImages([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  // 1) Image Cover
  req.body.imageCover = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/products/${req.body.imageCover}`);

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${uuidv4()}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/products/${req.body.imageCover}`);

      req.body.images.push(filename);
    })
  );

  next();
});


// @desc:   Get A List Of Product
// @route:  GET {API_V}/products
// @access: Public
exports.getProducts = dry.getAll(Product, 'Products');

// @desc:   Get A Specific Product
// @route:  GET {API_V}/products/:id
// @access: Public
exports.getProduct = dry.getOne(Product, 'reviews');

// @desc:   Create A New Product
// @route:  POST {API_V}/products
// @access: Private
exports.createProducts = dry.createOne(Product);

// @desc:   Update A Specific Product
// @route:  PUT {API_V}/products/:id
// @access: Private
exports.updateProduct = dry.updateOne(Product);

// @desc:   Delete A Specific Product
// @route:  DELETE {API_V}/products/:id
// @access: Private
exports.deleteProduct = dry.deleteOne(Product);
