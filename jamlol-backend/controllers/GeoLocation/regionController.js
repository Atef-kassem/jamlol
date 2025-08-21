const { Region, City } = require("../../Model");
const catchAsync = require("../../utils/catchAsync");

exports.createRegion = catchAsync(async (req, res, next) => {
  const {name, city_id} = req.body;

  const city = await City.findByPk(city_id);
  if (!city) {
    throw new Error("city not found");
  }

  const region = await Region.create({
    name,
    city_id
  });

  res.status(201).json({
    status: "success",
    region
  });
});

exports.getAllRegions = catchAsync(async (req, res, next) => {
  const regions = await Region.findAll({});

  res.status(201).json({
    status: "success",
     regions,
  });
});

exports.updateRegion = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {city_id} = req.body;
  const city = await City.findByPk(city_id);
  if (!city) {
    throw new Error("city not found");
  }

  const region = await Region.findByPk(id);
  if (!region) {
    throw new Error("region not found");
  }

  region.set(req.body);

  await region.save();
  res.status(200).json({
    status: "success",
     region,
  });
});

exports.deleteRegion = catchAsync(async (req, res, next) => {
  const { id } = req.params;

    const region = await Region.findByPk(id);
  if (!region) {
    return res.status(404).json({ success: false, message: "region not found" });
  }
  await region.destroy();
  res.status(204).json({
    status: "success",
    message: "region deleted successfully",
  });
});
