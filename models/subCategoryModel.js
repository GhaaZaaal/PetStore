const mongoose = require('mongoose');

// 1- Create Schema
const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'SubCategory Already Exists'],
      minlength: [2, 'Too Short SubCategory Name'],
      maxlength: [32, 'Too Long SubCategory Name'],
    },
    // IF Name; 'A and B' => shopping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory Must Be a Child To a Parent Category'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SubCategory', SubCategorySchema);
