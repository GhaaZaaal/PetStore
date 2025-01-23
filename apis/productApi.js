const express = require('express');
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/productValidator');

const {
  createProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require('../controllers/productControllers');

const authController = require('../controllers/authControllers');
const reviewApi = require('./reviewApi');

const router = express.Router();
// POST /products/:productId/reviews
// GET /products/:productId/reviews
// GET /products/:productId/reviews/:reviewId
router.use('/:productsId/reviews', reviewApi);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProducts
  )
  .get(getProducts);

router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
