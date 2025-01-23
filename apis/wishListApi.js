const express = require('express');

const {
  addProductToWishList,
  removeProductToWishList,
  GetLoggedUserWishList,
} = require('../controllers/wishListControllers');

const authController = require('../controllers/authControllers');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    addProductToWishList
  )
  .get(
    authController.protect,
    authController.restrictTo('user'),
    GetLoggedUserWishList
  );

router.delete(
  '/:productId',
  authController.protect,
  authController.restrictTo('user'),
  removeProductToWishList
);

module.exports = router;
