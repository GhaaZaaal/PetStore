const express = require('express');

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getCategoryIdToBody,
  createFilterBody,
} = require('../controllers/subCategoryControllers');
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');

const authController = require('../controllers/authControllers');

// Merge Params => Allow Access Params In Other Routes
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    getCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory
  )
  .get(createFilterBody, getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;
