const { param } = require("express-validator");
const Ajv = require("ajv").default;
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const { appInfoSchema } = require("../../ajv/appInfoSchema");
const AppError = require("../../utils/appError");

module.exports = {
  appInfoDataValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(appInfoSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
  updateAppInfo: [
    (req, res, next) => {
      const updateSchema = { ...appInfoSchema, required: [] };
      const isValid = ajv.validate(updateSchema, req.body);
      if (!isValid) {
        return  next(new Error(ajv.errorsText()));
      }
      next();
    },
    param("id").isInt().withMessage("app id must be a number"),
  ],
};
