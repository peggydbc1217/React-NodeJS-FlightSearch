const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.code === 11000) {
    const value = Object.values(err.keyValue)[0];

    err = new AppError(
      `Duplicate field value: ${value}. Please use another value!`,
      400
    );
  }

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}:${err.value}.`;
    return new AppError(message, 400);
  }

  if (err.name === "ValidationError") {
    const error = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${error.join(". ")}`;
    return new AppError(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    return new AppError("Invalid token. Please log in again!", 401);
  }
  if (err.name === "TokenExpiredError") {
    return new AppError("Your token has expired! Please log in again!", 401);
  }

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};
