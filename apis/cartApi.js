const express = require('express');

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
} = require('../controllers/cartControllers');

const authController = require('../controllers/authControllers');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('user'));
router
  .route('/')
  .get(getLoggedUserCart)
  .post(addProductToCart)
  .delete(clearCart);

router
  .route('/:itemId')
  .get()
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem);

module.exports = router;
