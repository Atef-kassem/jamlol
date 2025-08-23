const { Naqel, Car, Model, Driver } = require("../../Model");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

exports.createCar = catchAsync(async (req, res, next) => {
   const naqel = await Naqel.findByPk(req.body.naqel_id);
   if(!naqel){
    return next(new AppError("Naqel not found", 404));
   }
   const model = await Model.findByPk(req.body.model_id);
   if(!model){
    return next(new AppError("Car model not found", 404));
   }

   const driver = await Driver.findByPk(req.body.driver_id);
   if(!driver){
    return next(new AppError("Driver not found", 404));
   }

   const car = await Car.create(req.body);
   
const carWithDreiverNaqelModel = await Car.findByPk(car.id, {
  exclude: ["driver_id", "model_id", "naqel_id"],
  include: [
    {
      model: Driver,
      as: "Driver",
      attributes: ["id", "driver_name"],
    },
    {
      model: Naqel,
      as: "Naqel",
      attributes: ["id", "name"],
    },
    {
      model: Model,
      as: "Model",
      attributes: ["id", "title"],
    },
  ],
});

  res.status(201).json({
    status: "success",
    car: carWithDreiverNaqelModel,
  });
});

exports.getAllCars = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, naqel_id } = req.query;

  const offset = (page - 1) * limit;
  const whereClause = {};

  if (naqel_id){
    whereClause.naqel_id= naqel_id;
  }


  const cars = await Car.findAll({
    where: whereClause,
    exclude: ["driver_id", "model_id", "naqel_id"],
    include: [
      {
        model: Naqel,
        as: "Naqel",
        attributes: ["id", "name"],
      },
      {
        model: Model,
        as: "Model",
        attributes: ["id", "title"],
      },
      {
        model: Driver,
        as: "Driver",
        attributes: ["id", "driver_name"],
      },
    ],
    limit,
    offset,
  });

  res.status(200).json({
    status: "success",
    cars,
  });
});

exports.getCarById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const car = await Car.findByPk(id,{
    exclude: ["driver_id", "model_id", "naqel_id"],
    include: [
      {
        model: Naqel,
        as: "Naqel",
        attributes: ["id", "name"],
      },
      {
        model: Model,
        as: "Model",
        attributes: ["id", "title"],
      },
      
      {
        model: Driver,
        as: "Driver",
        attributes: ["id", "driver_name"],
      },
    ],
  });
  if (!car) {
    return next(new AppError("Driver not found", 404));
  }

  res.status(200).json({
    status: "success",
    car,
  });
});

exports.updateCar = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const car = await Car.findByPk(id);
  if (!car) {
    return next(new AppError("car not found", 404));
  }

  const model = await Model.findByPk(req.body.model_id);
  if(!model){
    return next(new AppError("Car model not found", 404));
  }

  const driver = await Driver.findByPk(req.body.driver_id);
  if(!driver){
    return next(new AppError("Driver not found", 404));
  }
  const naqel = await Naqel.findByPk(req.body.naqel_id);
  if(!naqel){
    return next(new AppError("Naqel not found", 404));
  }

  const updatedCar = await car.update(req.body);
  const carWithDreiverNaqelModel = await Car.findByPk(updatedCar.id, {
    exclude: ["driver_id", "model_id", "naqel_id"],
    include: [
      {
        model: Naqel,
        as: "Naqel",
        attributes: ["id", "name"],
      },
      {
        model: Model,
        as: "Model",
        attributes: ["id", "title"],
      },
      {
        model: Driver,
        as: "Driver",
        attributes: ["id", "driver_name"],
      },
    ],
  });
  res.status(200).json({
    status: "success",
    car: carWithDreiverNaqelModel,
  });
});


exports.deleteCar = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const car = await Car.findByPk(id);

  if (!car) {
    return next(new AppError("car not found", 404));
  }

  await car.destroy();

  res.status(200).json({
    status: "success",
    message: "car deleted successfully",
  });
});

