const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Naqel, Region, NaqelRegion } = require("../../Model");
const { sequelize } = require("../../Config/dbConfig");

// Create new Naqel
exports.createNaqel = catchAsync(async (req, res, next) => {
  const { regions, ...naqelData } = req.body;
  
  // Check if all regions exist
  const regionsData = await Region.findAll({ 
    where: { id: regions } 
  });
  
  if (regions.length !== regionsData.length) {
    return next(new AppError("Some regions not found", 404));
  }

  const identification_type = naqelData.naqlen_type === "person" ? "card" : "sgl";
  
  // Start transaction
  const transaction = await sequelize.transaction();
  
  try {
    // Create the naqel record within transaction
    const naqel = await Naqel.create({
      ...naqelData, 
      identification_type
    }, { transaction });

    const naqelRegions = regionsData.map(region => ({
      naqel_id: naqel.id,
      region_id: region.id,
    }));

    // Create the many-to-many relationships within transaction
    await NaqelRegion.bulkCreate(naqelRegions, { transaction });

    // Commit transaction
    await transaction.commit();

    // Fetch the created naqel with regions for response
    const naqelWithRegions = await Naqel.findByPk(naqel.id, {
      include: [
        {
          model: Region,
          through: { attributes: [] }, // Don't include junction table attributes
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(201).json({
      status: "success",
      data: {
        naqel: naqelWithRegions,
      },
    });
  } catch (error) {
    // Rollback transaction on error
    await transaction.rollback();
    throw error;
  }
});

// Get all Naqels
exports.getAllNaqels = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, naqlen_type, active, region_id } = req.query;

  const offset = (page - 1) * limit;
  const whereClause = {};

  if (naqlen_type) {
    whereClause.naqlen_type = naqlen_type;
  }
  if (active) {
    whereClause.active = active;
  }

  // Build the include clause for regions
  const includeClause = [
    {
      model: Region,
      through: { attributes: [] }, // Don't include junction table attributes
      attributes: ["id", "name"],
      ...(region_id && { where: { id: region_id } }), // Filter by region if provided
    },
  ];

  const naqleen = await Naqel.findAll({
    where: whereClause,
    include: includeClause,
    limit,
    offset,
  });

  res.status(200).json({
    status: "success",
    data: {
      naqleen,
    },
  });
});

// Get Naqel by ID
exports.getNaqelById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const naqel = await Naqel.findByPk(id);
  if (!naqel) {
    return next(new AppError("Naqel not found", 404));
  }

  const naqelWithRegions = await Naqel.findByPk(id, {
    include: [
      {
        model: Region,
        through: { attributes: [] }, // Don't include junction table attributes
        attributes: ["id", "name"],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      naqel: naqelWithRegions,
    },
  });
});

// Update Naqel
exports.updateNaqel = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const naqel = await Naqel.findByPk(id);
  if (!naqel) {
    return next(new AppError("Naqel not found", 404));
  }

  // Start transaction
  const transaction = await sequelize.transaction();
  
  try {
    // Handle regions update if provided
    if (updateData.regions && Array.isArray(updateData.regions)) {
      // Validate that all regions exist
      const regions = await Region.findAll({ 
        where: { id: updateData.regions } 
      });
      
      if (regions.length !== updateData.regions.length) {
        await transaction.rollback();
        return next(new AppError("Some regions not found", 404));
      }

      // Remove existing region associations within transaction
      await NaqelRegion.destroy({ where: { naqel_id: id }, transaction });

      // Create new region associations within transaction
      const naqelRegions = updateData.regions.map(regionId => ({
        naqel_id: id,
        region_id: regionId,
      }));
      await NaqelRegion.bulkCreate(naqelRegions, { transaction });

      // Remove regions from updateData to avoid storing in main table
      delete updateData.regions;
    }

    // Update the naqel record within transaction
    const updatedNaqel= await naqel.update(updateData, { transaction });

    // Commit transaction
    await transaction.commit();

    // Fetch updated naqel with regions
    const naqelWithRegions = await Naqel.findByPk(updatedNaqel.id, {
      include: [
        {
          model: Region,
          through: { attributes: [] },
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: {
        naqel: naqelWithRegions,
      },
    });
  } catch (error) {
    // Rollback transaction on error
    await transaction.rollback();
    throw error;
  }
});

// Delete Naqel
exports.deleteNaqel = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const naqel = await Naqel.findByPk(id);

  if (!naqel) {
    return next(new AppError("Naqel not found", 404));
  }

  // Start transaction
  const transaction = await sequelize.transaction();
  
  try {
    // Delete region associations first within transaction
    await NaqelRegion.destroy({ where: { naqel_id: id }, transaction });

    // Delete the naqel record within transaction
    await naqel.destroy({ transaction });

    // Commit transaction
    await transaction.commit();

    res.status(200).json({
      status: "success",
      message: "Naqel deleted successfully",
    });
  } catch (error) {
    // Rollback transaction on error
    await transaction.rollback();
    throw error;
  }
});

