const Router = require("express").Router();
const { getAllRolePermissions } = require("../../controllers/RBAC/rolePermissionController");

Router.route("/").get(getAllRolePermissions);

module.exports = Router;
