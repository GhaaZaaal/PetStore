const express = require('express');
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brandValidator');

const {
  createBrand,
  getBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeBrandImage,
} = require('../controllers/brandControllers');

const authController = require('../controllers/authControllers');

const router = express.Router();

router
  .route('/')
  .get(getBrands)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    uploadBrandImage,
    resizeBrandImage,
    createBrandValidator,
    createBrand
  );

router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    uploadBrandImage,
    resizeBrandImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    deleteBrandValidator,
    deleteBrand
  );

module.exports = router;
