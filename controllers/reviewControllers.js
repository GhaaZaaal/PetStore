const dry = require('./dontRepeatYourself');
const Review = require('../models/reviewModel');

// Nested Route
// @route: GET {API_V}/products/:productId/reviews
exports.createFilterBody = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { prodcut: req.params.productId };
  req.filterObject = filterObject;
  next();
};
// @desc:   Get A List Of Reviews
// @route:  GET {API_V}/reviews
// @access: Public
exports.getReviews = dry.getAll(Review);

// @desc:   Get A Specific Review
// @route:  GET {API_V}/reviews/:id
// @access: Public
exports.getReview = dry.getOne(Review);

// Nested Route (Create)
exports.getProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productsId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

// @desc:   Create A New Reviews
// @route:  POST {API_V}/reviews
// @access: Protected
exports.createReview = dry.createOne(Review);

// @desc:   Update A Specific Review
// @route:  PUT {API_V}/reviews/:id
// @access: Protected
exports.updateReview = dry.updateOne(Review);

// @desc:   Delete A Specific Review
// @route:  DELETE {API_V}/reviews/:id
// @access: Protected/User-Admin-Manager
exports.deleteReview = dry.deleteOne(Review);
