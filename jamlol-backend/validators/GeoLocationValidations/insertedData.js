const { param } = require("express-validator");
const Ajv = require("ajv").default;
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const AppError = require("../../utils/appError");
const citySchema = require("../../ajv/GeoLocationSchemas/citySchema");
const countrySchema = require("../../ajv/GeoLocationSchemas/countrySchema");
const regionSchema = require("../../ajv/GeoLocationSchemas/regionSchema");

module.exports = {
  countryValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(countrySchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
  cityValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(citySchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
  updateCityValidation: [
    (req, res, next) => {
      const updateSchema = { ...citySchema, required: [] };
      const isValid = ajv.validate(updateSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
  regionValidation: [
    (req, res, next) => {
      const isValid = ajv.validate(regionSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
  updateRegionValidation: [
    (req, res, next) => {
      const updateSchema = { ...regionSchema, required: [] };
      const isValid = ajv.validate(updateSchema, req.body);
      if (!isValid) {
        return next(new AppError(ajv.errorsText(), 400));
      }
      next();
    },
  ],
};
