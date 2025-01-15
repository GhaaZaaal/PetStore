const sharp = require('sharp');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const { default: slugify } = require('slugify');
const dry = require('./dontRepeatYourself');
const { uploadSingleImage } = require('../middlewares/uploadImage');
const ApiError = require('../utils/apiError');
const User = require('../models/userModel');

exports.uploadUserImage = uploadSingleImage('profileImage');
// @desc:   Image Processing
// @access: Private
exports.resizeUserImage = asyncHandler(async (req, res, next) => {
  const filename = `User-${uuidv4()}-${Date.now()}.jpg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(800, 800)
      .toFormat('jpg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);

    req.body.image = filename;
    // console.log('File Name:', filename);
  }
  next();
});

// @desc:   Upload Category Image
// @access: Private

// @desc:   Get A List Of Users
// @route:  GET {API_V}/Users
// @access: Public
exports.getUsers = dry.getAll(User);

// @desc:   Get A Specific User
// @route:  GET {API_V}/Users/:id
// @access: Public
exports.getUser = dry.getOne(User);

// @desc:   Create A New Users
// @route:  POST {API_V}/Users
// @access: Private
exports.createUser = dry.createOne(User);

// @desc:   Update A Specific User
// @route:  PUT {API_V}/Users/:id
// @access: Private
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

exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
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
// @route:  DELETE {API_V}/Users/:id
// @access: Private
exports.deleteUser = dry.deleteOne(User);
