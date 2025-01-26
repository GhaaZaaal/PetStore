const express = require('express');

const authController = require('../controllers/authControllers');
const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
} = require('../controllers/cartControllers');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    getLoggedUserCart
  )
  .post(
    authController.protect,
    authController.restrictTo('user'),
    addProductToCart
  )
  .delete(authController.protect, authController.restrictTo('user'), clearCart);

router
  .route('/:itemId')
  .get()
  .put(
    authController.protect,
    authController.restrictTo('user'),
    updateCartItemQuantity
  )
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    removeSpecificCartItem
  );

module.exports = router;
