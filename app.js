const path = require('path');

const express = require('express');
const morgan = require('morgan');
require('dotenv/config');

// APIs
const categoryApi = require('./apis/categoryApi');
const subCategoryApi = require('./apis/subCategoryApi');
const brandApi = require('./apis/brandApi');
const productApi = require('./apis/productApi');
const userApi = require('./apis/userApi');

// Error Handler
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/db');

// Database Connection
dbConnection();

// Express App
const app = express();
const apiV = process.env.API_V;

// Middleware for parsing JSON (in case you want to accept JSON requests)
app.use(express.json());
app.use(`${apiV}`, express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'Development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

app.use(`${apiV}/categories`, categoryApi);
app.use(`${apiV}/subCategories`, subCategoryApi);
app.use(`${apiV}/brands`, brandApi);
app.use(`${apiV}/products`, productApi);
app.use(`${apiV}/users`, userApi);
// Create Error and Send it To Error Handling Middleware
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't Find This Route: ${req.originalUrl}`, 400));
});

// Global Error Handling Middleware
app.use(globalError);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

// Handle Rejections Errors Outside Express
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting Down....`);
    process.exit(1);
  });
});
