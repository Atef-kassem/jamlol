const Router = require("express").Router();
const { createNaqel,updateNaqel, deleteNaqel, getNaqelById, getAllNaqels } = require("../../controllers/Naqel/naqelController");
const { naqlenValidation, updateNaqlenValidation } = require("../../validators/NaqlenValidations/insertedData");
const { insertedErrors } = require("../../validators/validationResult");

// Basic CRUD operations
Router.route("/").post(naqlenValidation, insertedErrors, createNaqel).get(getAllNaqels);

Router.route("/:id")
  .get(getNaqelById)
  .patch(updateNaqlenValidation, insertedErrors, updateNaqel)
  .delete(deleteNaqel);


module.exports = Router;
