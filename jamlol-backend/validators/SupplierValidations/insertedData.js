// validators/usevalidations/insertedData.js
const { body } = require("express-validator");
const userModel = require("../../Model/userModel"); // تأكدي إن ده model بتاع Sequelize
const Ajv = require("ajv").default;
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const supplierSchema = require("../../ajv/SupplierSchemas/supplierSchema");
const AppError = require("../../utils/appError");

module.exports = {
  supplierValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(supplierSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],

  updateSupplierValidation: [
    (req, res, next) => {
      const updateSchema = { ...supplierSchema, required: [] };
      const isValid = ajv.validate(updateSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
};
