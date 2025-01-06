const express = require('express');

const {
  createCategories,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryControllers');

const router = express.Router();

router.route('/').post(createCategories).get(getCategories);
router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory);

module.exports = router;
