const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Driver, Naqel } = require("../../Model");
exports.createDriver = catchAsync(async (req, res, next) => {
   const naqel = await Naqel.findByPk(req.body.naqel_id);
   if(!naqel){
    return next(new AppError("Naqel not found", 404));
   }
   const driver = await Driver.create(req.body);
   const driverWithNaqel = await Driver.findByPk(driver.id, {
    include: [
      {
        model: Naqel,
        as: "Naqel",
        attributes: ["id", "name"],
      },
    ],
   });
  res.status(201).json({
    status: "success",
    driver: driverWithNaqel,
  });
});

exports.getAllDrivers = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, naqel_id } = req.query;

  const offset = (page - 1) * limit;
  const whereClause = {};

  if (naqel_id){
    whereClause.naqel_id= naqel_id;
  }

  const drivers = await Driver.findAll({
    where: whereClause,
    include: [
      {
        model: Naqel,
        as: "Naqel",
        attributes: ["id", "name"],
      },
    ],
    limit,
    offset,
  });

  res.status(200).json({
    status: "success",
    drivers,
  });
});

exports.getDriverById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const driver = await Driver.findByPk(id,{
    include: [
      {
        model: Naqel,
        as: "Naqel",
        attributes: ["id", "name"],
      },
    ],
  });
  if (!driver) {
    return next(new AppError("Driver not found", 404));
  }

  res.status(200).json({
    status: "success",
    driver,
  });
});

exports.updateDriver = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const driver = await Driver.findByPk(id);
  if (!driver) {
    return next(new AppError("driver not found", 404));
  }
  const naqel = await Naqel.findByPk(req.body.naqel_id);
  if(!naqel){
    return next(new AppError("Naqel not found", 404));
  }
  
  const updatedDriver = await driver.update(req.body);
  const driverWithNaqel = await Driver.findByPk(updatedDriver.id, {
    include: [
      {
        model: Naqel,
        as: "Naqel",
        attributes: ["id", "name"],
      },
    ],
  });
  res.status(200).json({
    status: "success",
    driver: driverWithNaqel,
  });
});

exports.deleteDriver = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const driver = await Driver.findByPk(id);

  if (!driver) {
    return next(new AppError("driver not found", 404));
  }

  await driver.destroy();

  res.status(200).json({
    status: "success",
    message: "driver deleted successfully",
  });
});

