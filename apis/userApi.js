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

router.use(authController.protect);

router.get('/getMe', getLoggedUserData, getUser);
router.put('/updateMyPassword', UpdateLoggedUserPassword);
router.put('/updateMe', UpdateLoggedUserDataValidator, UpdateLoggedUserData);
router.put('/deactivateMe', deactivateLoggedUser);

// Admin
router
  .route('/updatePassword/:id')
  .put(
    authController.restrictTo('admin', 'manager'),
    updatePasswordValidator,
    updateUserPassword
  );

router
  .route('/')
  .get(authController.restrictTo('admin', 'manager'), getUsers)
  .post(
    authController.restrictTo('admin'),
    uploadUserImage,
    resizeUserImage,
    createUserValidator,
    createUser
  );

router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;

