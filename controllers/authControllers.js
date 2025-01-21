const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/userModel');

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// @desc:   SignUp
// @route:  GET {API_V}/auth/singup
// @access: Public
exports.singUp = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    slug: req.body.slug, // Include the slug field
  });

  const token = createToken(user._id);

  res.status(201).json({ data: user, token });
});

// @desc:   Get User
// @route:  GET {API_V}/auth/login
// @access: Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError('Please Provide Email and Password', 400));
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError('Invalid Email or Password', 401));
  }

  const token = createToken(user._id);

  res.status(200).json({ data: user, token });
});

// @desc:   Protect Route (Check if User is Logged In)
// @route:  Any Routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // Get Token and Check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(' ')[1];
    // console.log(req.headers.authorization);
  }
  // Check if Token Exists
  if (!token) {
    return next(new ApiError('Please Login To Access', 401));
  }

  // console.log('before deconding');
  // Verify Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log('after deconding');
  // Check if User Still Exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new ApiError('User Not Found', 401));
  }

  // Check if User Changed Password After Token Was Issued
  if (currentUser.passwordChangedAt) {
    const passwordChangedAfter = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );

    if (passwordChangedAfter > decoded.iat) {
      return next(new ApiError('User Recently Changed Password', 401));
    }
  }

  req.user = currentUser;

  next();
});

// @desc:   Authorize User Roles (Users Permissions)
exports.restrictTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return next(new ApiError('You Do Not Have Permission', 403));
    }

    next();
  });

// @desc:   Forgot Password
// @route:  POST {API_V}/auth/forgotPassword
// @access: Public
// exports.forgetPassword = asyncHandler(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return next(new ApiError(`Email:*${req.body.email}* Not Found`, 404));
//   }

//   const resetOTP = Math.floor(100000 + Math.random() * 900000).toString();
//   const hashedOTP = crypto.createHash('sha256').update(resetOTP).digest('hex');

//   user.passwordResetOTP = hashedOTP;
//   user.passwordResetExpires = Date.now() + 3 * 60 * 1000; // 3 Minutes
//   user.validatePassBeforeSave = false;

//   await user.save();

//   const message = `Hi, ${user.name},\nWe received a request to reset the password on your PetStore Account.\nYour Password Reset OTP is:  ${resetOTP}.\nIf you did not request a password reset, please ignore this email or contact support if you have questions.\n\nThanks,\nPetStore Team`;

//   // Send Email
//   await sendEmail({
//     email: user.email,
//     subject: 'Password Reset OTP',
//     message,
//   });

//   res.status(200).json({
//     status: 'success',
//     message: 'Password Reset OTP Sent to Email!',
//   });
// });
