const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const bcrypt = require('bcrypt');

const dry = require('./dontRepeatYourself');
const ApiError = require('../utils/apiError');
const { uploadSingleImage } = require('../middlewares/uploadImage');
const createToken = require('../utils/createToken');
const User = require('../models/userModel');

// Upload Single Image
exports.uploadUserImage = uploadSingleImage('profileImage');
// Image Processing
exports.resizeUserImage = asyncHandler(async (req, res, next) => {
  const filename = `User-${uuidv4()}-${Date.now()}.jpg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);

    req.body.image = filename;
  }
  next();
});

// @desc:   Create A New Users
// @route:  POST {API_V}/users
// @access: Protected/Admin
exports.createUser = dry.createOne(User);

// @desc:   Get A Specific User
// @route:  GET {API_V}/users/:id
// @access: Protected/Admin
exports.getUser = dry.getOne(User);

// @desc:   Get A List Of Users
// @route:  GET {API_V}/users
// @access: Protected/Admin
exports.getUsers = dry.getAll(User);

// @desc:   Update A Specific User
// @route:  PUT {API_V}/users/:id
// @access: Protected/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      profileImage: req.body.profileImage,
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError(`[ ${req.params.id} ]: Not Found!`, 404));
  }
  res.status(200).json({ data: user });
});

// @desc:   Update A Specific User Password
// @route:  PUT {API_V}/users/changePassword
// @access: Protected/User
exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError(`[ ${req.params.id} ]: Not Found!`, 404));
  }
  res.status(200).json({ data: user });
});

// @desc:   Delete A Specific User
// @route:  DELETE {API_V}/users/:id
// @access: Protected/Admin
exports.deleteUser = dry.deleteOne(User);

// @desc:   Get Logged User Data
// @route:  GET {API_V}/users/getMe
// @access: Protected/Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc:   Update Logged User Password
// @route:  PUT {API_V}/users/updateMyPassword
// @access: Protected/Protect
exports.UpdateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError(`[ ${req.user._id} ]: Not Found!`, 404));
  }

  const token = createToken(user._id);

  res.status(200).json({ data: user, token });
});

// @desc:   Update Logged User Data
// @route:  PUT {API_V}/users/updateMe
// @access: Protected/Protect
exports.UpdateLoggedUserData = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      // profileImage: req.body.profileImage,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ data: user });
});

// @desc:   Delete A Specific User
// @route:  DELETE {API_V}/users/:id
// @access: Protected/Admin
exports.deactivateLoggedUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: 'Success' });
});
