const Product = require('../models/productModel');
const dry = require('./dontRepeatYourself');

// @desc:   Get A List Of Product
// @route:  GET {API_V}/products
// @access: Public
exports.getProducts = dry.getAll(Product, 'Products');

// @desc:   Get A Specific Product
// @route:  GET {API_V}/products/:id
// @access: Public
exports.getProduct = dry.getOne(Product);

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
