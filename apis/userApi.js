const express = require('express');
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  updatePasswordValidator,
  UpdateLoggedUserDataValidator,
} = require('../utils/validators/userValidator');

const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeUserImage,
  updateUserPassword,
  getLoggedUserData,
  UpdateLoggedUserPassword,
  UpdateLoggedUserData,
  deactivateLoggedUser,
} = require('../controllers/userControllers');

const authController = require('../controllers/authControllers');

const router = express.Router();
router.get('/getMe', authController.protect, getLoggedUserData, getUser);
router.put(
  '/updateMyPassword',
  authController.protect,
  UpdateLoggedUserPassword
);

router.put(
  '/updateMe',
  authController.protect,
  UpdateLoggedUserDataValidator,
  UpdateLoggedUserData
);

router.put('/deactivateMe', authController.protect, deactivateLoggedUser);

router
  .route('/updatePassword/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    updatePasswordValidator,
    updateUserPassword
  );

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    getUsers
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    uploadUserImage,
    resizeUserImage,
    createUserValidator,
    createUser
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    getUserValidator,
    getUser
  )
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    uploadUserImage,
    resizeUserImage,
    updateUserValidator,
    updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    deleteUserValidator,
    deleteUser
  );

module.exports = router;
