const express = require('express');
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');

const {
  createCategories,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryControllers');

const subCategoriesApi = require('./subCategoryApi');

const router = express.Router();

router.use('/:categoryId/subCategories', subCategoriesApi);

router.route('/').post(createCategoryValidator, createCategories).get(getCategories);

router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
