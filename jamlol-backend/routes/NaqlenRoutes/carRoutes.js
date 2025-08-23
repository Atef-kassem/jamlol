const Router = require("express").Router();
const { createCar, getAllCars, getCarById, updateCar, deleteCar } = require("../../controllers/Naqel/carController");
const { carValidation, updateCarValidation } = require("../../validators/NaqlenValidations/insertedData");
const { insertedErrors } = require("../../validators/validationResult");

Router.route("/").post(carValidation, insertedErrors, createCar).get(getAllCars);

Router.route("/:id")
  .get(getCarById)
  .patch(updateCarValidation, insertedErrors, updateCar)
  .delete(deleteCar);


module.exports = Router;
