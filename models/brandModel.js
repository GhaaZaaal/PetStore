const mongoose = require('mongoose');

// 1- Create Schema
const brandSchema = new mongoose.Schema(
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

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.APP_URL}${process.env.API_V}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};

brandSchema.post('init', (doc) => {
  setImageUrl(doc);
});

brandSchema.post('save', (doc) => {
  setImageUrl(doc);
});

// 2- Create Model
const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
