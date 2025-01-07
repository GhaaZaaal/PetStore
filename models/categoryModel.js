const mongoose = require('mongoose');

// 1- Create Schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, 'Category Already Exists'],
      required: [true, 'Category Required'],
      minlength: [3, 'Too Short Category Name'],
      maxlength: [32, 'Too Long Category Name'],
    },
    // IF Name; 'A and B' => shopping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

// 2- Create Model
const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;
