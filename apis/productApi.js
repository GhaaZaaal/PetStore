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
} = require('../controllers/productControllers');

const router = express.Router();

router
  .route('/')
  .post(createProductValidator, createProducts)
  .get(getProducts);

router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
