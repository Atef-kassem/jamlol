const { Country } = require("../../Model");
const catchAsync = require("../../utils/catchAsync");

exports.createCountry = catchAsync(async (req, res, next) => {
  const {name} = req.body;

  const country = await Country.create({
    name,
  });

  res.status(201).json({
    status: "success",
    country
  });
});

exports.getAllCountries = catchAsync(async (req, res, next) => {
  const countries = await Country.findAll({});

  res.status(201).json({
    status: "success",
     countries,
  });
});

exports.updateCountry = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const country = await Country.findByPk(id);
  if (!country) {
    throw new Error("country not found");
  }

  country.set(req.body);
  await country.save();

  res.status(200).json({
    status: "success",
     country,
  });
});

exports.deleteCountry = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find the permission
  const country = await Country.findByPk(id);
  if (!country) {
    return res.status(404).json({ success: false, message: "country not found" });
  }
  await country.destroy();
  res.status(204).json({
    status: "success",
    message: "country deleted successfully",
  });
});
