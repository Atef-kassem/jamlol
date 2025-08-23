// validators/usevalidations/insertedData.js
const { body } = require("express-validator");
const Ajv = require("ajv").default;
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const naqlenSchema = require("../../ajv/NaqlenSchemas/naqlenSchema");
const AppError = require("../../utils/appError");
const driverSchema = require("../../ajv/NaqlenSchemas/driverSchema");
const modelSchema = require("../../ajv/NaqlenSchemas/modelSchema");
const carSchema = require("../../ajv/NaqlenSchemas/carSchema");
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
      if(req.body.naqlen_type || req.body.identification_number || req.body.identification_type){
        return next(new AppError("You are not allowed to update these fields", 400));
      }
      // Create update schema excluding restricted fields
      const { naqlen_type, identification_number, identification_type, ...updateSchema } = naqlenSchema.properties;
      const filteredSchema = {
        type: "object",
        properties: updateSchema,
        additionalProperties: false
      };
      

      const isValid = ajv.validate(filteredSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
  driverValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(driverSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
  updateDriverValidation: [
    (req, res, next) => {
      const updateSchema = { ...driverSchema, required: [] };
      const isValid = ajv.validate(updateSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
  carValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(carSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
  updateCarValidation: [
    (req, res, next) => {
      const updateSchema = { ...carSchema, required: [] };
      const isValid = ajv.validate(updateSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
  modelValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(modelSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
  updateModelValidation: [
    (req, res, next) => {
      const updateSchema = { ...modelSchema, required: [] };
      const isValid = ajv.validate(updateSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
};
