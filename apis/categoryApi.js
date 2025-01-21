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
  uploadCategoryImage,
  resizeCategoryImage,
} = require('../controllers/categoryControllers');

const authController = require('../controllers/authControllers');

const subCategoriesApi = require('./subCategoryApi');

const router = express.Router();

router.use('/:categoryId/subCategories', subCategoriesApi);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    uploadCategoryImage,
    resizeCategoryImage,
    createCategoryValidator,
    createCategories
  )
  .get(getCategories);

router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    uploadCategoryImage,
    resizeCategoryImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;
