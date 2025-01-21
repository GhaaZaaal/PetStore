require('dotenv/config');
const ApiError = require('../utils/apiError');

const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProduction = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleJwtInvalidSignatureError = () =>
  new ApiError('Invalid Token, Please Login Again', 401);

const handleJwtExpiredError = () =>
  new ApiError('Token Expired, Please Login Again', 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'Development') {
    sendErrorForDev(err, res);
  } else if (process.env.NODE_ENV === 'Production') {
    if (err.name === 'JsonWebTokenError')
      err = handleJwtInvalidSignatureError();
    if (err.name === 'TokenExpiredError') err = handleJwtExpiredError();
    sendErrorForProduction(err, res);
  }
};

module.exports = globalError;
