const { param } = require("express-validator");
const Ajv = require("ajv").default;
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const AppError = require("../../utils/appError");
const managementSchema = require("../../ajv/managementSchema");

module.exports = {
  managementValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(managementSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
};
