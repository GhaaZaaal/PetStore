const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

// @desc:   Calculate Total Cart Price
const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
};

// @desc:   Add Product To Cart
// @route:  POST {API_V}/cart
// @access: Protected-Private/User
exports.addProductToCart = asyncHandler(async (req, res) => {
  const { productId, color } = req.body;
  
  const product = await Product.findById(productId);

  // 1- Get Cart For Logged User
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, color, price: product.price }],
    });
  } else {
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );

    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;

      cart.cartItems[productIndex] = cartItem;
    } else {
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }

  // Calculate Total Cart Price
  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Product Added To Cart Successfully',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc:   Get Logged User Cart
// @route:  GET {API_V}/cart
// @access: Protected-Private/User
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(
      new ApiError(`There is no Cart for this User Id: ${req.user._id} `, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc:   Remove Specific Cart Item
// @route:  DELETE {API_V}/cart/:itemId
// @access: Protected-Private/User
exports.removeSpecificCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.itemId } },
    },
    { new: true }
  );

  calcTotalCartPrice(cart);
  cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Product Removed From Cart Successfully',
    data: cart,
  });
});

// @desc:   Clear Cart Items
// @route:  DELETE {API_V}/cart
// @access: Protected-Private/User
exports.clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.status(200).send({
    status: 'success',
    message: 'Cart Is Empty',
  });
});

// @desc:   Update Specific Cart Items
// @route:  DELETE {API_V}/cart/:itemId
// @access: Private/User
exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(
      new ApiError(`There is no Cart for this user Id: ${req.user._id} `, 404)
    );
  }

  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemId
  );
  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(
      new ApiError(`There is no Item for this Id: ${req.user._id} `, 404)
    );
  }

  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: 'Success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
