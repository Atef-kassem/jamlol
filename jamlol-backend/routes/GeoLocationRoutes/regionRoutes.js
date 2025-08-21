const { createRegion, getAllRegions, updateRegion, deleteRegion } = require("../../controllers/GeoLocation/regionController");
const { regionValidation, updateRegionValidation } = require("../../validators/GeoLocationValidations/insertedData");
const { insertedErrors } = require("../../validators/validationResult");

const Router = require("express").Router();



Router.route("/").post(regionValidation, insertedErrors,createRegion).get(getAllRegions);
Router.route("/:id").patch(updateRegionValidation, insertedErrors, updateRegion).delete(deleteRegion);

module.exports = Router;
