const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Naqlen, Region } = require("../../Model");

// Create new naqlen
exports.createNaqlen = catchAsync(async (req, res, next) => {
  const naqlenData = req.body;

  const newNaqlen = await Naqlen.create(naqlenData);

  if (!newNaqlen) {
    return next(new AppError("Failed to create naqlen", 400));
  }

  res.status(201).json({
    status: "success",
    data: {
      naqlen: newNaqlen,
    },
  });
});

// Get all naqlens
exports.getAllNaqlens = catchAsync(async (req, res, next) => {
  const naqlens = await Naqlen.findAll({
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
    results: naqlens.length,
    data: {
      naqlens,
    },
  });
});

// Get naqlen by ID
exports.getNaqlenById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const naqlen = await Naqlen.findByPk(id, {
    include: [
      {
        model: Region,
        as: "Region",
        attributes: ["id", "name"],
      },
    ],
  });

  if (!naqlen) {
    return next(new AppError("Naqlen not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      naqlen,
    },
  });
});

// Get naqlens by region ID
exports.getNaqlensByRegion = catchAsync(async (req, res, next) => {
  const { regionId } = req.params;

  // First check if region exists
  const region = await Region.findByPk(regionId);
  if (!region) {
    return next(new AppError("Region not found", 404));
  }

  const naqlens = await Naqlen.findAll({
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
    results: naqlens.length,
    data: {
      region: {
        id: region.id,
        name: region.name,
      },
      naqlens,
    },
  });
});

// Update naqlen
exports.updateNaqlen = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const naqlen = await Naqlen.findByPk(id);

  if (!naqlen) {
    return next(new AppError("Naqlen not found", 404));
  }

  const updatedNaqlen = await naqlen.update(updateData);

  res.status(200).json({
    status: "success",
    data: {
      naqlen: updatedNaqlen,
    },
  });
});

// Delete naqlen
exports.deleteNaqlen = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const naqlen = await Naqlen.findByPk(id);

  if (!naqlen) {
    return next(new AppError("Naqlen not found", 404));
  }

  await naqlen.destroy();

  res.status(200).json({
    status: "success",
    message: "Naqlen deleted successfully",
    data: null,
  });
});

// Get naqlens with pagination and filtering
exports.getNaqlensWithFilters = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, naqlen_type, active, region_id } = req.query;

  const offset = (page - 1) * limit;
  const whereClause = {};

  if (naqlen_type) {
    whereClause.naqlen_type = naqlen_type;
  }

  if (active !== undefined) {
    whereClause.active = active === "true";
  }

  if (region_id) {
    whereClause.region_id = region_id;
  }

  const { count, rows: naqlens } = await Naqlen.findAndCountAll({
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
      naqlens,
    },
  });
});
