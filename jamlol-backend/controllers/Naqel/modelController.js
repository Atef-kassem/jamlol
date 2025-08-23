const { Model } = require("../../Model");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
exports.createModel= catchAsync(async (req, res, next) => {
   const model = await Model.create(req.body);
  res.status(201).json({
    status: "success",
    model,
  });
});

exports.getAllModels = catchAsync(async (req, res, next) => {


  const models = await Model.findAll();

  res.status(200).json({
    status: "success",
    models,
  });
});

exports.getModelById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const model = await Model.findByPk(id);
  if (!model) {
    return next(new AppError("Model not found", 404));
  }

  res.status(200).json({
    status: "success",
    model,
  });
});

exports.updateModel = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const model = await Model.findByPk(id);

  if (!model) {
    return next(new AppError("model not found", 404));
  }
  
  const updatedModel = await model.update(req.body);

  res.status(200).json({
    status: "success",
    model: updatedModel,
  });
});

exports.deleteModel = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const model = await Model.findByPk(id);

  if (!model) {
    return next(new AppError("model not found", 404));
  }

  await model.destroy();

  res.status(200).json({
    status: "success",
    message: "model deleted successfully",
  });
});

