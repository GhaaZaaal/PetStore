const express = require('express');
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brandValidator');

const { createBrand, getBrand, getBrands, updateBrand, deleteBrand } = require('../controllers/brandControllers');

const router = express.Router();

router.route('/').post(createBrandValidator, createBrand).get(getBrands);

router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
