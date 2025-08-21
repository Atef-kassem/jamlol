const { createCountry, getAllCountries, updateCountry, deleteCountry } = require("../../controllers/GeoLocation/countryController");
const { countryValidation } = require("../../validators/GeoLocationValidations/insertedData");
const { insertedErrors } = require("../../validators/validationResult");

const Router = require("express").Router();



Router.route("/").post(countryValidation, insertedErrors,createCountry).get(getAllCountries);
Router.route("/:id").patch(countryValidation, insertedErrors, updateCountry).delete(deleteCountry);

module.exports = Router;
