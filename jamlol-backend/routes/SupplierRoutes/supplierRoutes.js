const Router = require("express").Router();
const {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  getSuppliersByRegion,
  getSuppliersWithFilters,
} = require("../../controllers/Supplier/supplierController");
const { supplierValidation, updateSupplierValidation } = require("../../validators/SupplierValidations/insertedData");
const { insertedErrors } = require("../../validators/validationResult");

// Basic CRUD operations
Router.route("/").post(supplierValidation, insertedErrors, createSupplier).get(getSuppliersWithFilters);

Router.route("/all").get(getAllSuppliers);

Router.route("/:id")
  .get(getSupplierById)
  .patch(updateSupplierValidation, insertedErrors, updateSupplier)
  .delete(deleteSupplier);

// Get suppliers by region
Router.route("/region/:regionId").get(getSuppliersByRegion);

module.exports = Router;
