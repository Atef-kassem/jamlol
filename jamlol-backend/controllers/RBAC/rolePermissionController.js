const { RolePermission, Role, Permission  } = require("../../Model");

const catchAsync = require("../../utils/catchAsync");

exports.getAllRolePermissions = catchAsync(async (req, res, next) => {
  const rolePermissions = await RolePermission.findAll({
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
      },
      { model: Permission, attributes: ["id", "name", "slug", "management_id"] },
    ],
    attributes: ["id", "roleId", "permissionId"],
  });

  res.status(200).json({
    status: "success",
    data: rolePermissions,
  });
});
