const Router = require("express").Router();
const { createApp, getAllApps, deleteApp, updateApp } = require("../controllers/appController");
const { appInfoDataValidation ,updateAppInfo } = require("../validators/AppInfoValidations/insertedData");
const upload = require("../middlewares/upload");
const { insertedErrors } = require("../validators/validationResult");


Router.route("/").post(upload.single("app_logo"), appInfoDataValidation, insertedErrors, createApp).get(getAllApps);
Router.route("/:id").patch(upload.single("app_logo"), updateAppInfo, insertedErrors, updateApp).delete(deleteApp);

module.exports = Router;
