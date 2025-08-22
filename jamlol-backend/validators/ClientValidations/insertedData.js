// validators/usevalidations/insertedData.js
const { body } = require("express-validator");
const userModel = require("../../Model/userModel"); // تأكدي إن ده model بتاع Sequelize
const Ajv = require("ajv").default;
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const clientSchema = require("../../ajv/ClientSchemas/clientSchema");
const AppError = require("../../utils/appError");

module.exports = {
  clientValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(clientSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],

  updateClientValidation: [
    (req, res, next) => {
      const updateSchema = { ...clientSchema, required: [] };
      const isValid = ajv.validate(updateSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
};
