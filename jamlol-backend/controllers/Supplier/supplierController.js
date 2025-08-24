const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Supplier, Region } = require("../../Model");

// Create new supplier
exports.createSupplier = catchAsync(async (req, res, next) => {
  const supplierData = req.body;

  // Check if region exists
  const region = await Region.findByPk(supplierData.region_id);
  if (!region) {
    return next(new AppError("Region not found", 404));
  }

  const identification_type = supplierData.supplier_type === "person" ? "card" : "sgl";

  // Create the supplier record
  const supplier = await Supplier.create({
    ...supplierData,
    identification_type,
  });

  // Fetch the created supplier with region for response
  const supplierWithRegion = await Supplier.findByPk(supplier.id, {
    include: [
      {
        model: Region,
        attributes: ["id", "name"],
      },
    ],
  });

  res.status(201).json({
    status: "success",
    data: {
      supplier: supplierWithRegion,
    },
  });
});

// Get all suppliers
exports.getAllSuppliers = catchAsync(async (req, res, next) => {
  let { page = 1, limit = 10, supplier_type, active, region_id } = req.query;

  // ضروري التحويل لـ Number
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;

  const offset = (page - 1) * limit;
  const whereClause = {};

  if (supplier_type) {
    whereClause.supplier_type = supplier_type;
  }
  if (active) {
    whereClause.active = active;
  }
  if (region_id) {
    whereClause.region_id = region_id;
  }

  // Build the include clause for region
  const includeClause = [
    {
      model: Region,
      attributes: ["id", "name"],
    },
  ];

  const suppliers = await Supplier.findAll({
    where: whereClause,
    include: includeClause,
    limit,
    offset,
  });

  res.status(200).json({
    status: "success",
    data: {
      suppliers,
    },
  });
});

// Get supplier by ID
exports.getSupplierById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const supplier = await Supplier.findByPk(id);
  if (!supplier) {
    return next(new AppError("Supplier not found", 404));
  }

  const supplierWithRegion = await Supplier.findByPk(id, {
    include: [
      {
        model: Region,
        attributes: ["id", "name"],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      supplier: supplierWithRegion,
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

  // Check if region exists if region_id is being updated
  if (updateData.region_id) {
    const region = await Region.findByPk(updateData.region_id);
    if (!region) {
      return next(new AppError("Region not found", 404));
    }
  }

  // Update the supplier record
  const updatedSupplier = await supplier.update(updateData);

  // Fetch updated supplier with region
  const supplierWithRegion = await Supplier.findByPk(updatedSupplier.id, {
    include: [
      {
        model: Region,
        attributes: ["id", "name"],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      supplier: supplierWithRegion,
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

  // Delete the supplier record
  await supplier.destroy();

  res.status(200).json({
    status: "success",
    message: "Supplier deleted successfully",
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
