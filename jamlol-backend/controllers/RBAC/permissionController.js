const { Permission, RolePermission, Management } = require("../../Model");
const catchAsync = require("../../utils/catchAsync");

exports.createPermission = catchAsync(async (req, res, next) => {
  const { name, slug, management_id } = req.body;
  const management = await Management.findByPk(management_id);
  if (!management) {
    return next(new Error("Management not found"));
  }

  const permission = await Permission.create({
    name,
    slug,
    management_id,
  });

  res.status(201).json({
    status: "success",
    permission
  });
});

exports.getAllPermissions = catchAsync(async (req, res, next) => {
  const permissions = await Permission.findAll({
    include: [
      {
        model: Management,
        attributes: ["name"],
      },
    ],
  });

  res.status(201).json({
    status: "success",
     permissions,
  });
});

exports.updatePermission = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const permission = await Permission.findByPk(id);
  if (!permission) {
    throw new Error("Permission not found");
  }

  // Update multiple fields
  permission.set(req.body);

  await permission.save();
  res.status(200).json({
    status: "success",
     permission,
  });
});

exports.deletePermission = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find the permission
  const permission = await Permission.findByPk(id);
  if (!permission) {
    return res.status(404).json({ success: false, message: "Permission not found" });
  }
  await permission.destroy();
  res.status(204).json({
    status: "success",
    message: "Permission deleted successfully",
  });
});
