const mongoose = require('mongoose');

// 1- Create Schema
const productSchema = new mongoose.Schema(
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
    availableColors: [String],
    imageCover: {
      type: String,
      required: [true, 'Product Image Cover Required'],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, "Product's Category Required"],
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
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating Must Be Above or Equal To 1.0'],
      max: [5, 'Rating Must Be Equal To or Below 5.0'],
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

// ? Testing Populate With Mongoose Middleware First Try
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name',
  });
  next();
});

const setImagesUrl = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.APP_URL}${process.env.API_V}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    doc.images = doc.images.map(
      (image) => `${process.env.APP_URL}${process.env.API_V}/products/${image}`
    );
  }
};

productSchema.post('init', (doc) => {
  setImagesUrl(doc);
});

productSchema.post('save', (doc) => {
  setImagesUrl(doc);
});

// 2- Create Model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
