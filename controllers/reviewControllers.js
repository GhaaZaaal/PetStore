const dry = require('./dontRepeatYourself');
const Review = require('../models/reviewModel');

exports.createFilterBody = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { prodcut: req.params.productId };
  req.filterObject = filterObject;
  next();
};// Nested Route To Get SubCategory

// @desc:   Get A List Of Reviews
// @route:  GET {API_V}/Reviews
// @access: Public
exports.getReviews = dry.getAll(Review);

// @desc:   Get A Specific Review
// @route:  GET {API_V}/Reviews/:id
// @access: Public
exports.getReview = dry.getOne(Review);

exports.getProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productsId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};// Nested Route To Create Review

// @desc:   Create A New Reviews
// @route:  POST {API_V}/Reviews
// @access: Private
exports.createReview = dry.createOne(Review);

// @desc:   Update A Specific Review
// @route:  PUT {API_V}/Reviews/:id
// @access: Private
exports.updateReview = dry.updateOne(Review);

// @desc:   Delete A Specific Review
// @route:  DELETE {API_V}/Reviews/:id
// @access: Private/Protect/User-Admin-Manager
exports.deleteReview = dry.deleteOne(Review);
