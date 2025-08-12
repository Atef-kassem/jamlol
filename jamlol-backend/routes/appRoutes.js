const Router = require("express").Router();
const { createApp, getAllApps, deleteApp, updateApp } = require("../controllers/appController");
const { appInfoDataValidation ,updateAppInfo } = require("../validators/AppInfoValidations/insertedData");
const upload = require("../middlewares/upload");


Router.route("/").post(upload.single("app_logo"), appInfoDataValidation, createApp).get(getAllApps);
Router.route("/:id").patch(upload.single("app_logo"), updateAppInfo, updateApp).delete(deleteApp);

module.exports = Router;
