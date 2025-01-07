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

// Merge Params => Allow Access Params In Other Routes

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(getCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterBody, getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
