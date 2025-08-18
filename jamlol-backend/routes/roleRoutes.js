const { getAllRoles, createRole, updateRole, deleteRole, assignPermissionsToRole } = require("../controllers/roleController");
const { createRoleValidation, updateRoleValidation, assignPermissionsToRoleValidation } = require("../validators/RBACValidators/insertedData");
const { insertedErrors } = require("../validators/validationResult");

const Router = require("express").Router();

Router.route("/").get(getAllRoles).post(createRoleValidation, insertedErrors, createRole);

Router.route("/:id").get(getAllRoles).patch(updateRoleValidation, insertedErrors, updateRole).delete(deleteRole);
Router.route("/:id/assign-permissions").patch(assignPermissionsToRoleValidation, insertedErrors, assignPermissionsToRole);
module.exports = Router;
