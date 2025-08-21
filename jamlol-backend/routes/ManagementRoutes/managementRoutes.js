const Router = require("express").Router();
const { createManagement, getAllManagements, updateManagement, deleteManagement, getManagementWithPermissions } = require("../../controllers/Management/managementController");
const { managementValidation } = require("../../validators/ManagementValidations/insertedData");
const { insertedErrors } = require("../../validators/validationResult");


Router.route("/").post(managementValidation, insertedErrors, createManagement).get(getAllManagements);
Router.route("/:id").patch(managementValidation, insertedErrors, updateManagement).delete(deleteManagement);
Router.route("/permissions").get(getManagementWithPermissions);
module.exports = Router;
