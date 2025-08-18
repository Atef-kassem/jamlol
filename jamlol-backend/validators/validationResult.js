const { validationResult } = require("express-validator");
const appError = require("../utils/appError");

module.exports = {
  insertedErrors: (req, res, next) => {
    const errors = validationResult(req);
    let message = errors
      .array()
      .map((error) => error.msg)
      .join(",");
    if (!errors.isEmpty()) {
      let error = new appError(message, 400);
      return next(error);
    }
    next();
  },
};
