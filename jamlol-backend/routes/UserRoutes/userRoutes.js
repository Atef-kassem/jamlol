const { userId, signUpDataValidation, checkUserNotExists, updateUserDataValidation } = require("../../validators/UserValidations/insertedData.js");
const { insertedErrors } = require("../../validators/validationResult.js");
const { getAllUsers, CreateUser, getUser, deleteUser, updateUser, assignRoleToUser, getUserPermissions, getMyPermissions } = require("../../controllers/User/userController.js");
const upload = require("../../middlewares/upload.js");

const Router = require("express").Router();

Router.route("/").get(getAllUsers).post(upload.single("photo"),signUpDataValidation, checkUserNotExists, insertedErrors, CreateUser);
Router.route("/:id").patch(upload.single("photo"), userId,updateUserDataValidation,insertedErrors, updateUser).get(getUser).delete(userId, deleteUser);
Router.route("/:id/assign-role").patch(assignRoleToUser);
Router.route("/:id/permissions").get(getUserPermissions);
Router.route("/me/permissions").get(getMyPermissions);

module.exports = Router;
