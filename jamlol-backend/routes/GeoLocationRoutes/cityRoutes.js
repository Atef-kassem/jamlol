const { createCity, getAllCities, deleteCity, updateCity } = require("../../controllers/GeoLocation/cityController");
const { insertedErrors } = require("../../validators/validationResult");
const { cityValidation, updateCityValidation } = require("../../validators/GeoLocationValidations/insertedData");

const Router = require("express").Router();



Router.route("/").post(cityValidation, insertedErrors,createCity).get(getAllCities);
Router.route("/:id").patch(updateCityValidation, insertedErrors, updateCity).delete(deleteCity);

module.exports = Router;
