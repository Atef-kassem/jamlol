const Router = require("express").Router();
const { modelValidation, updateModelValidation } = require("../../validators/NaqlenValidations/insertedData");
const { insertedErrors } = require("../../validators/validationResult");
const { createModel, getAllModels, getModelById, updateModel, deleteModel } = require("../../controllers/Naqel/modelController");

Router.route("/").post(modelValidation, insertedErrors, createModel).get(getAllModels);

Router.route("/:id")
  .get(getModelById)
  .patch(updateModelValidation, insertedErrors, updateModel)
  .delete(deleteModel);


module.exports = Router;
