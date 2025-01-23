const express = require('express');
const {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require('../utils/validators/reviewValidator');

const {
  createReview,
  getReview,
  getReviews,
  updateReview,
  deleteReview,
  createFilterBody,
  getProductIdAndUserIdToBody,
} = require('../controllers/reviewControllers');

const authController = require('../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(createFilterBody, getReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    getProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );

router
  .route('/:id')
  .get(getReviewValidator, getReview)
  .put(
    authController.protect,
    authController.restrictTo('user'),
    updateReviewValidator,
    updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin', 'manager'),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
