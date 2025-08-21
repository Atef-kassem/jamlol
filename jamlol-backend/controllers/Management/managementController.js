const { Permission, Management } = require("../../Model");
const catchAsync = require("../../utils/catchAsync");

exports.createManagement = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const management = await Management.create({
    name,
  });

  res.status(201).json({
    status: "success",
    management,
  });
});

exports.getAllManagements = catchAsync(async (req, res, next) => {
  const managements = await Management.findAll({});

  res.status(201).json({
    status: "success",
    managements,
  });
});

exports.updateManagement = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const management = await Management.findByPk(id);
  if (!management) {
    throw new Error("management not found");
  }

  management.set(req.body);

  await management.save();
  res.status(200).json({
    status: "success",
    management,
  });
});

exports.deleteManagement = catchAsync(async (req, res, next) => {
  const { id } = req.params;
 
  const management = await Management.findByPk(id);
  if (!management) {
    return res.status(404).json({ success: false, message: "management not found" });
  }
  await management.destroy();
  res.status(204).json({
    status: "success",
    message: "management deleted successfully",
  });
});

exports.getManagementWithPermissions = catchAsync(async (req, res, next) => {
    const managements = await Management.findAll({
      include: [
        {
          model: Permission,
          attributes: ["id","name","slug",],
          order: [["management_id", "ASC"]],
        },
      ],
    });
  
    res.status(201).json({
      status: "success",
       managements,
    });
  });