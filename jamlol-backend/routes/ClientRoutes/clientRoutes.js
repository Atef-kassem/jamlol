const Router = require("express").Router();
const {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  getClientsByRegion,
  getClientsWithFilters,
} = require("../../controllers/Client/clientController");
const { clientValidation, updateClientValidation } = require("../../validators/ClientValidations/insertedData");
const { insertedErrors } = require("../../validators/validationResult");

// Basic CRUD operations
Router.route("/").post(clientValidation, insertedErrors, createClient).get(getClientsWithFilters);

Router.route("/all").get(getAllClients);

Router.route("/:id")
  .get(getClientById)
  .patch(updateClientValidation, insertedErrors, updateClient)
  .delete(deleteClient);

// Get clients by region
Router.route("/region/:regionId").get(getClientsByRegion);

module.exports = Router;
