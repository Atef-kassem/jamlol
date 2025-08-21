const { City, Country } = require("../../Model");
const catchAsync = require("../../utils/catchAsync");

exports.createCity = catchAsync(async (req, res, next) => {
  const {name, country_id} = req.body;

  const country = await Country.findByPk(country_id);
  if (!country) {
    throw new Error("country not found");
  }

  const city = await City.create({
    name,
    country_id
  });

  res.status(201).json({
    status: "success",
    city
  });
});

exports.getAllCities = catchAsync(async (req, res, next) => {
  const cities = await City.findAll({});

  res.status(201).json({
    status: "success",
     cities,
  });
});

exports.updateCity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {country_id} = req.body;
  const country = await Country.findByPk(country_id);
  if (!country) {
    throw new Error("country not found");
  }

  const city = await City.findByPk(id);
  if (!city) {
    throw new Error("city not found");
  }

  city.set(req.body);

   await city.save();
  res.status(200).json({
    status: "success",
     city,
  });
});

exports.deleteCity = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find the permission
  const city = await City.findByPk(id);
  if (!city) {
    return res.status(404).json({ success: false, message: "city not found" });
  }
  await city.destroy();
  res.status(204).json({
    status: "success",
    message: "city deleted successfully",
  });
});
