const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Supplier, Region } = require("../../Model");

// Create new supplier
exports.createSupplier = catchAsync(async (req, res, next) => {
  const supplierData = req.body;

  const newSupplier = await Supplier.create(supplierData);

  if (!newSupplier) {
    return next(new AppError("Failed to create supplier", 400));
  }

  res.status(201).json({
    status: "success",
    data: {
      supplier: newSupplier,
    },
  });
});

// Get all suppliers
exports.getAllSuppliers = catchAsync(async (req, res, next) => {
  const suppliers = await Supplier.findAll({
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
    results: suppliers.length,
    data: {
      suppliers,
    },
  });
});

// Get supplier by ID
exports.getSupplierById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const supplier = await Supplier.findByPk(id, {
    include: [
      {
        model: Region,
        as: "Region",
        attributes: ["id", "name"],
      },
    ],
  });

  if (!supplier) {
    return next(new AppError("Supplier not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      supplier,
    },
  });
});

// Get suppliers by region ID
exports.getSuppliersByRegion = catchAsync(async (req, res, next) => {
  const { regionId } = req.params;

  // First check if region exists
  const region = await Region.findByPk(regionId);
  if (!region) {
    return next(new AppError("Region not found", 404));
  }

  const suppliers = await Supplier.findAll({
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
    results: suppliers.length,
    data: {
      region: {
        id: region.id,
        name: region.name,
      },
      suppliers,
    },
  });
});

// Update supplier
exports.updateSupplier = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const supplier = await Supplier.findByPk(id);

  if (!supplier) {
    return next(new AppError("Supplier not found", 404));
  }

  const updatedSupplier = await supplier.update(updateData);

  res.status(200).json({
    status: "success",
    data: {
      supplier: updatedSupplier,
    },
  });
});

// Delete supplier
exports.deleteSupplier = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const supplier = await Supplier.findByPk(id);

  if (!supplier) {
    return next(new AppError("Supplier not found", 404));
  }

  await supplier.destroy();

  res.status(204).json({
    status: "success",
    message: "Supplier deleted successfully",
    data: null,
  });
});

// Get suppliers with pagination and filtering
exports.getSuppliersWithFilters = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, supplier_type, active, region_id } = req.query;

  const offset = (page - 1) * limit;
  const whereClause = {};

  if (supplier_type) {
    whereClause.supplier_type = supplier_type;
  }

  if (active !== undefined) {
    whereClause.active = active === "true";
  }

  if (region_id) {
    whereClause.region_id = region_id;
  }

  const { count, rows: suppliers } = await Supplier.findAndCountAll({
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
      suppliers,
    },
  });
});
