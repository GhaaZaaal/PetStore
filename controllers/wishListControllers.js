const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc:   Add Product To WishList Of The User
// @route:  POST {API_V}/wishList
// @access: Protected/User
exports.addProductToWishList = asyncHandler(async (req, res, next) => {
  // Add To Set => The Product ID To WishList (Only Once Per Product)
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

// @desc:   Remove Product From WishList Of The User
// @route:  DELETE {API_V}/wishList
// @access: Protected/User
exports.removeProductToWishList = asyncHandler(async (req, res, next) => {
  // Pull => Removes The Product ID From WishList (If Exists)
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
exports.GetLoggedUserWishList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishList');

  res.status(200).json({
    status: 'success',
    results: user.wishList.length,
    data: user.wishList,
  });
});
