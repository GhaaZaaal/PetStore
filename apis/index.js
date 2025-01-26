require('dotenv/config');

const categoryApi = require('./categoryApi');
const subCategoryApi = require('./subCategoryApi');
const brandApi = require('./brandApi');
const productApi = require('./productApi');
const userApi = require('./userApi');
const authApi = require('./authApi');
const reviewApi = require('./reviewApi');
const wishListApi = require('./wishListApi');
const cart = require('./cartApi');

const apiV = process.env.API_V;

const mountApis = (app) => {
  app.use(`${apiV}/categories`, categoryApi);
  app.use(`${apiV}/subCategories`, subCategoryApi);
  app.use(`${apiV}/brands`, brandApi);
  app.use(`${apiV}/products`, productApi);
  app.use(`${apiV}/users`, userApi);
  app.use(`${apiV}/auth`, authApi);
  app.use(`${apiV}/reviews`, reviewApi);
  app.use(`${apiV}/wishList`, wishListApi);
  app.use(`${apiV}/cart`, cart);
};

module.exports = mountApis;
