const { userId, signUpDataValidation, checkUserNotExists, updateUserDataValidation } = require("../validators/UserValidations/insertedData.js");
const { insertedErrors } = require("../validators/validationResult.js");
const { getAllUsers, CreateUser, getUser, deleteUser, updateUser } = require("../controllers/userController");
const upload = require("../middlewares/upload.js");

const Router = require("express").Router();

Router.route("/").get(getAllUsers).post(upload.single("photo"),signUpDataValidation, checkUserNotExists, insertedErrors, CreateUser);
Router.route("/:id").patch(upload.single("photo"), userId,updateUserDataValidation,insertedErrors, updateUser).get(getUser).delete(userId, deleteUser);

module.exports = Router;
