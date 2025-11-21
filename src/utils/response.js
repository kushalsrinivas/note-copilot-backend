/**
 * Standard success response
 */
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Standard error response
 */
const errorResponse = (res, message = 'Error', statusCode = 500, errors = null) => {
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(errors && { details: errors }),
  });
};

module.exports = { successResponse, errorResponse };

