const mongoose = require('mongoose');

// 1- Create Schema
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Brand Required'],
      trim: true,
      minlength: [3, 'Too Short Product Title'],
      maxlength: [100, 'Too Long Product Title'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product Description Required'],
      minlength: [32, 'Product Description'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product Quantity Required'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product Price Required'],
      trim: true,
      max: [10000, 'Price Limit Reached'],
    },
    priceAfterDiscount: {
      type: Number,
    },
    availableColors : [String],
    imageCover: {
      type: String,
      required: [true, 'Product Image Cover Required'],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product\'s Category Required'],
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    rateAverage: {
      type: Number,
      min: [1, 'Rating Must Be Above or Equal To 1.0'],
      max: [5, 'Rating Must Be Equal To or Below 5.0'], 
    },
    ratingsCount: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

// 2- Create Model
module.exports = mongoose.model('Product', ProductSchema);
