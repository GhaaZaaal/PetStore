const asyncHandler = require('express-async-handler');

const ApiError = require('../utils/apiError');
const dry = require('./dontRepeatYourself');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// @desc:   Create Cash Order
// @route:  GET {API_V}/orders/cartId
// @access: Protected/User
exports.createCashOrder = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;
  // 1- Get Cart Depend On Cart Id
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`Cart is Empty! For This Id ${req.params.cartId}`, 404)
    );
  }
  // 2- Get Order Price Depend On Cart Price
  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
  // 3- Create Order With Default PaymentMethod Cash
  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });
  // 4- After Creating Order, Decrement Product Quantity, Increment Sold Quantity
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    // !
    await Product.bulkWrite(bulkOption, {});

    // 5- Clear Cart For User
    await Cart.findByIdAndDelete(req.params.cartId);
  }

  res.status(201).json({ status: 'success', data: order });
});

exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'user') req.filterObj = { user: req.user._id };
  next();
});

// @desc:   Get All Orders
// @route:  GET {API_V}/orders
// @access: Protected/User-Admin-Manager
exports.getAllOrders = dry.getAll(Order);

// @desc:   Get Specific Orders
// @route:  GET {API_V}/orders/:orderId
// @access: Protected/User-Admin-Manager
exports.getSpecificOrder = dry.getOne(Order);

// @desc:   Get Specific Orders
// @route:  GET {API_V}/orders/:orderId
// @access: Protected/User-Admin-Manager
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(
        `Their is no such an order for this user: ${req.params.id}`,
        404
      )
    );
  }

  // update order to paid
  order.isPaid = true;
  order.paidAt = Date.now();

  const updateOrder = await order.save();

  res.status(200).json({ status: 'success', data: updateOrder });
});

// @desc:   Get Specific Orders
// @route:  GET {API_V}/orders/:orderId
// @access: Protected/User-Admin-Manager
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ApiError(
        `Their is no such an order for this user: ${req.params.id}`,
        404
      )
    );
  }

  // update order to paid
  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updateOrder = await order.save();

  res.status(200).json({ status: 'success', data: updateOrder });
});
