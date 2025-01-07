const express = require('express');
const morgan = require('morgan');
require('dotenv/config');

const dbConnection = require('./config/db');

dbConnection();

const categoryApi = require('./apis/categoryApi');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// Express App
const app = express();

// Middleware for parsing JSON (in case you want to accept JSON requests)
app.use(express.json());

if (process.env.NODE_ENV === 'Development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

const apiV = process.env.API_V;
app.use(`${apiV}/categories`, categoryApi);
// Create Error and Send it To Error Handling Middleware
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't Find This Route: ${req.originalUrl}`, 400));
});

// Global Error Handling Middleware
app.use(globalError);

// Handle Rejections Errors Outside Express
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting Down....`);
    process.exit(1);
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
