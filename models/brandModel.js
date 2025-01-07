const mongoose = require('mongoose');

// 1- Create Schema
const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, 'Brand Already Exists'],
      required: [true, 'Brand Required'],
      minlength: [3, 'Too Short Brand Name'],
      maxlength: [32, 'Too Long Brand Name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

// 2- Create Model
module.exports = mongoose.model('Brand', BrandSchema);
