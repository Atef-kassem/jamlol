const Router = require("express").Router();
const { updateDriver, deleteDriver, getDriverById, getAllDrivers, createDriver } = require("../../controllers/Naqel/driverController");
const { driverValidation, updateDriverValidation } = require("../../validators/NaqlenValidations/insertedData");
const { insertedErrors } = require("../../validators/validationResult");

Router.route("/").post(driverValidation, insertedErrors, createDriver).get(getAllDrivers);

Router.route("/:id")
  .get(getDriverById)
  .patch(updateDriverValidation, insertedErrors, updateDriver)
  .delete(deleteDriver);


module.exports = Router;
