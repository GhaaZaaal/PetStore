const mongoose = require('mongoose');

// 1- Create Schema
const categorySchema = new mongoose.Schema(
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

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.APP_URL}${process.env.API_V}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};

categorySchema.post('init', (doc) => {
  setImageUrl(doc);
});

categorySchema.post('save', (doc) => {
  setImageUrl(doc);
});

// 2- Create Model
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
