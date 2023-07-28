const { ValidationError } = require("sequelize")

function logErrors(err, req, res, next) {
  console.error(err) // log error
  next(err)
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  else if (err.name === "TokenExpiredError") {
    res.status(401).json({
      statusCode: 401,
      message: "Expired Token"
    });
  }
  else if (err.name === "JsonWebTokenError") {
    res.status(498).json({
      statusCode: 498,
      message: "Invalid"
    });
  }
  next(err)
}

const queryErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }
  next(err);
};

module.exports = { logErrors, errorHandler, boomErrorHandler, queryErrorHandler }
