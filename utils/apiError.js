// @desc:  This Class Is Responsible For Operation Errors (Errors That I Can Predict)

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
    this.isOperational = true;
  }
}

module.exports = ApiError;
