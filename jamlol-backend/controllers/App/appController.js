const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const path = require("path");
const { AppInfo } = require("../../Model");

exports.createApp = catchAsync(async (req, res, next) => {
  // Check if any AppInfo document already exists
  const existingApp = await AppInfo.count();
  if (existingApp > 0) {
    return next(new AppError("Only one company can be created", 400));
  }
  // Handle file upload for app_logo
  let appLogoPath = null;
  if (req.file) {
    appLogoPath = path.join("uploads", req.file.filename);
  }

  // Merge req.body and app_logo path
  const appData = {
    ...req.body,
    app_logo: appLogoPath,
  };

  // Create new app if no document exists
  const newApp = await AppInfo.create(appData);

  if (!newApp) {
    return next(new AppError("Failed to create app information", 500));
  }

  res.status(201).json({
    status: "success",
    app: newApp,
  });
});

exports.updateApp = catchAsync(async (req, res, next) => {
  const app = await AppInfo.findByPk(req.params.id *1);
  if (!app) {
    return next(new AppError("App not found", 404));
  }

  // Handle file upload for app_logo
  let appLogoPath = app.app_logo; // القيمة القديمة
  if (req.file) {
    appLogoPath = path.join("uploads", req.file.filename);
  }
console.log(appLogoPath)
  // Merge req.body and app_logo path
  const updateData = {
    ...req.body,
    app_logo: appLogoPath,
  };

  app.set(updateData);
  await app.save();
  res.status(200).json({
    status: "success",
    app
  });
});

exports.getAllApps = catchAsync(async (req, res, next) => {
  const app = await AppInfo.findAll();
  res.status(200).json({
    status: "success",
    app: app,
  });
});

exports.deleteApp = catchAsync(async (req, res, next) => {
  const app = await AppInfo.findByPk(req.params.id);
  if (!app) {
    return next(new AppError("App not found", 404));
  }
  await app.destroy();
  res.status(204).json({
    status: "success",
  });
});