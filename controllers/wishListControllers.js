const asyncHandler = require('express-async-handler');

const ApiError = require('../utils/apiError');
const User = require('../models/userModel');

// @desc:   Add Product To WishList Of The User
// @route:  POST {API_V}/wishList
// @access: Protected/User
exports.addProductToWishList = asyncHandler(async (req, res, next) => {
  // Add To Set => Adds The ID of a Product To WishList (Only Once Per Product)
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: req.body.productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Product Added Successfully To Your WishList.',
    data: user.wishList,
  });
});

// @desc:   Remove Product To WishList Of The User
// @route:  DELETE {API_V}/wishList
// @access: Protected/User
exports.removeProductToWishList = asyncHandler(async (req, res, next) => {
  // Add To Set => Remove The ID of a Product To WishList (If Exists)
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishList: req.body.productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Product Removed Successfully From Your WishList.',
    data: user.wishList,
  });
});

// @desc:   Get Logged User WishList
// @route:  GET {API_V}/wishList
// @access: Protected/User
exports.GetLoggedUserWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('wishList');

  res
    .status(200)
    .json({
      status: 'success',
      results: user.wishList.length,
      data: user.wishList,
    });
});
