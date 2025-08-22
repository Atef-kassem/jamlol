const Router = require("express").Router();
const {
  createNaqlen,
  getAllNaqlens,
  getNaqlenById,
  updateNaqlen,
  deleteNaqlen,
  getNaqlensByRegion,
  getNaqlensWithFilters,
} = require("../../controllers/Naqlen/naqlenController");
const { naqlenValidation, updateNaqlenValidation } = require("../../validators/NaqlenValidations/insertedData");
const { insertedErrors } = require("../../validators/validationResult");

// Basic CRUD operations
Router.route("/").post(naqlenValidation, insertedErrors, createNaqlen).get(getNaqlensWithFilters);

Router.route("/all").get(getAllNaqlens);

Router.route("/:id")
  .get(getNaqlenById)
  .patch(updateNaqlenValidation, insertedErrors, updateNaqlen)
  .delete(deleteNaqlen);

// Get naqlens by region
Router.route("/region/:regionId").get(getNaqlensByRegion);

module.exports = Router;
