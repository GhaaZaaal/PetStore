const express = require('express');

const authController = require('../controllers/authControllers');

const {
  addProductToWishList,
  removeProductToWishList,
  GetLoggedUserWishList,
} = require('../controllers/wishListControllers');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('user'));

router.route('/').post(addProductToWishList).get(GetLoggedUserWishList);

router.delete('/:productId', removeProductToWishList);

module.exports = router;
