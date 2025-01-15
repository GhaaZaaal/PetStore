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

const router = express.Router();

router
  .route('/')
  .get(getBrands)
  .post(uploadBrandImage, resizeBrandImage, createBrandValidator, createBrand);

router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(uploadBrandImage, resizeBrandImage, updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
