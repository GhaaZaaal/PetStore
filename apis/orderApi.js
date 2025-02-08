const express = require('express');

const {
  createCashOrder,
  getAllOrders,
  getSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require('../controllers/orderControllers');

const authController = require('../controllers/authControllers');

const router = express.Router();

router.use(authController.protect);

router.get(
  '/',
  authController.restrictTo('user', 'admin', 'manager'),
  filterOrderForLoggedUser,
  getAllOrders
);
router
  .route('/:cartId')
  .post(authController.restrictTo('user'), createCashOrder);

router.route('/:id').get(getSpecificOrder);
router.put(
  '/:id/pay',
  authController.restrictTo('admin', 'manager'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  authController.restrictTo('admin', 'manager'),
  updateOrderToDelivered
);

// .delete(authController.protect, authController.restrictTo('admin'));

module.exports = router;
