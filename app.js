const path = require('path');

const express = require('express');
const morgan = require('morgan');
require('dotenv/config');

// Error Handler
const ApiError = require('./utils/apiError');
// Unhandled Error Handler
const globalError = require('./middlewares/errorMiddleware');
// Database Connection
const dbConnection = require('./config/db');
// APIs
const mountApis = require('./apis');

dbConnection();
const apiV = process.env.API_V;

// Express App
const app = express();

// Middleware for parsing JSON (in case you want to accept JSON requests)
app.use(express.json());
app.use(`${apiV}`, express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'Development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}
mountApis(app);

// Create Error and Send it To Error Handling Middleware
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't Find This Route: ${req.originalUrl}`, 400));
});

// Global Error Handling Middleware
app.use(globalError);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}${apiV}`);
});

// Handle Rejections Errors Outside Express
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting Down....`);
    process.exit(1);
  });
});
