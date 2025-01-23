const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 1- Create Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'User Name Required'],
      minlength: [3, 'Too Short User Name'],
      maxlength: [64, 'Too Long User Name'],
    },
    // Slug for the user
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'User Email Required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'User Password Required'],
    },
    passwordChangedAt: Date,
    passwordResetOTP: String,
    passwordResetExpires: Date,
    validatePassBeforeSave: Boolean,

    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    roles: {
      type: String,
      enum: ['admin', 'user', 'manager'],
      default: 'user',
    },
    profileImage: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    // Child Reference (One To Many)
    wishList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Fix: Model Name and Export
const User = mongoose.model('User', userSchema);

module.exports = User;
