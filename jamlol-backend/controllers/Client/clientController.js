const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Client, Region } = require("../../Model");

// Create new client
exports.createClient = catchAsync(async (req, res, next) => {
  const clientData = req.body;

  const newClient = await Client.create(clientData);

  if (!newClient) {
    return next(new AppError("Failed to create client", 400));
  }

  res.status(201).json({
    status: "success",
    data: {
      client: newClient,
    },
  });
});

// Get all clients
exports.getAllClients = catchAsync(async (req, res, next) => {
  const clients = await Client.findAll({
    include: [
      {
        model: Region,
        as: "Region",
        attributes: ["id", "name"],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    results: clients.length,
    data: {
      clients,
    },
  });
});

// Get client by ID
exports.getClientById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const client = await Client.findByPk(id, {
    include: [
      {
        model: Region,
        as: "Region",
        attributes: ["id", "name"],
      },
    ],
  });

  if (!client) {
    return next(new AppError("Client not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      client,
    },
  });
});

// Get clients by region ID
exports.getClientsByRegion = catchAsync(async (req, res, next) => {
  const { regionId } = req.params;

  // First check if region exists
  const region = await Region.findByPk(regionId);
  if (!region) {
    return next(new AppError("Region not found", 404));
  }

  const clients = await Client.findAll({
    where: { region_id: regionId },
    include: [
      {
        model: Region,
        as: "Region",
        attributes: ["id", "name"],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    results: clients.length,
    data: {
      region: {
        id: region.id,
        name: region.name,
      },
      clients,
    },
  });
});

// Update client
exports.updateClient = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const client = await Client.findByPk(id);

  if (!client) {
    return next(new AppError("Client not found", 404));
  }

  const updatedClient = await client.update(updateData);

  res.status(200).json({
    status: "success",
    data: {
      client: updatedClient,
    },
  });
});

// Delete client
exports.deleteClient = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const client = await Client.findByPk(id);

  if (!client) {
    return next(new AppError("Client not found", 404));
  }

  await client.destroy();

  res.status(204).json({
    status: "success",
    message: "Client deleted successfully",
    data: null,
  });
});

// Get clients with pagination and filtering
exports.getClientsWithFilters = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, active, region_id } = req.query;

  const offset = (page - 1) * limit;
  const whereClause = {};

  if (active !== undefined) {
    whereClause.active = active === "true";
  }

  if (region_id) {
    whereClause.region_id = region_id;
  }

  const { count, rows: clients } = await Client.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Region,
        as: "Region",
        attributes: ["id", "name"],
      },
    ],
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({
    status: "success",
    results: count,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      itemsPerPage: parseInt(limit),
    },
    data: {
      clients,
    },
  });
});
