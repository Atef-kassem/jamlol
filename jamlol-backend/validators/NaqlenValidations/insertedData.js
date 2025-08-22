// validators/usevalidations/insertedData.js
const { body } = require("express-validator");
const userModel = require("../../Model/userModel"); // تأكدي إن ده model بتاع Sequelize
const Ajv = require("ajv").default;
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const naqlenSchema = require("../../ajv/NaqlenSchemas/naqlenSchema");
const AppError = require("../../utils/appError");

module.exports = {
  naqlenValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(naqlenSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],

  updateNaqlenValidation: [
    (req, res, next) => {
      const updateSchema = { ...naqlenSchema, required: [] };
      const isValid = ajv.validate(updateSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
};
