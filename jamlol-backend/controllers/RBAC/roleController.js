const { Op } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");
const { Role, RolePermission, Permission, Management } = require("../../Model");
const catchAsync = require("../../utils/catchAsync");
const appError = require("../../utils/appError");

exports.getAllRoles = catchAsync(async (req, res, next) => {
  const roles = await Role.findAll({
    include: [
      {
        model: Permission,
        include: [
          {
            model: Management,
            attributes: ["name"],
          },
        ],
        attributes: ["name", "slug",],
        through: { attributes: [] }, // Exclude the join table attributes
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: roles,
  });
});

exports.createRole = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  // Validate that name is provided
  if (!name) {
    return next(new appError("Role name is required", 400));
  }
  // Check if a role with the same name already exists
  const existingRole = await Role.findOne({ where: { name } });
  if (existingRole) {
    return next(new appError("A role with this name already exists", 400));
  }
  // Create the role
  const newRole = await Role.create({ name });
  res.status(201).json({
    status: "success",
    data: {
      role: newRole,
    },
  });
});

exports.updateRole = catchAsync(async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;

    // التحقق من وجود الدور
    const role = await Role.findByPk(id, { transaction });
    if (!role) {
      await transaction.rollback();
      return next(new appError("Role not found", 404));
    }

    let hasChanges = false;

    // تحديث اسم الدور إذا تم توفيره
    if (name !== undefined && name !== null && name !== role.name) {
      // التحقق من عدم تكرار اسم الدور
      const existingRoleWithName = await Role.findOne({ 
        where: { 
          name, 
          id: { [Op.ne]: id } // استثناء الدور الحالي
        }, 
        transaction 
      });
      
      if (existingRoleWithName) {
        await transaction.rollback();
        return next(new appError("A role with this name already exists", 400));
      }

      role.set({ name });
      await role.save({ transaction });
      hasChanges = true;
    }

    // تحديث الصلاحيات إذا تم توفيرها
    if (permissions !== undefined && permissions !== null) {
      if (!Array.isArray(permissions)) {
        await transaction.rollback();
        return next(new appError("Permissions must be an array", 400));
      }

      if (permissions.length > 0) {
        // استخراج أسماء الصلاحيات
        const permissionNames = permissions.map(p => {
          if (typeof p === 'string') return p;
          if (typeof p === 'object') {
            // Handle format: {"permissionName": true}
            const keys = Object.keys(p);
            return keys.length > 0 ? keys[0] : null;
          }
          return null;
        }).filter(name => name !== null);

        if (permissionNames.length === 0) {
          await transaction.rollback();
          return next(new appError("Invalid permissions format", 400));
        }

        // التحقق من وجود الصلاحيات
        const existingPermissions = await Permission.findAll({
          where: { name: { [Op.in]: permissionNames } },
          transaction,
        });

        if (existingPermissions.length !== permissionNames.length) {
          const foundNames = existingPermissions.map(p => p.name);
          const missingNames = permissionNames.filter(name => !foundNames.includes(name));
          await transaction.rollback();
          return next(new appError(`Permissions not found: ${missingNames.join(', ')}`, 404));
        }

        // حذف الصلاحيات القديمة
        await RolePermission.destroy({ where: { role_id: id }, transaction });

        // إنشاء الصلاحيات الجديدة
        const rolePermissions = existingPermissions.map((permission) => ({
          role_id: id,
          permission_id: permission.id,
        }));
        await RolePermission.bulkCreate(rolePermissions, { transaction });
      } else {
        // إذا كانت الصلاحيات مصفوفة فارغة، احذف جميع الصلاحيات
        await RolePermission.destroy({ where: { role_id: id }, transaction });
      }
      hasChanges = true;
    }

    // إذا لم تكن هناك تغييرات
    if (!hasChanges) {
      await transaction.rollback();
      return next(new appError("No changes to update", 400));
    }

    // جلب الدور مع الصلاحيات المحدثة
    const roleWithPermissions = await Role.findByPk(id, {
      include: [
        {
          model: Permission,
          attributes: ["id", "name", "slug", "management_id"],
          through: { attributes: [] },
        },
      ],
      transaction,
    });

    await transaction.commit();

    res.status(200).json({
      status: "success",
      message: "Role updated successfully",
      data: {
        role: roleWithPermissions,
      },
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
});

exports.deleteRole = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const role = await Role.findByPk(id);
  if (!role) {
    return next(new appError("Role not found", 404));
  }
  // Remove related role permissions first (optional, for clean DB)
  await RolePermission.destroy({ where: { role_id: id } });
  await role.destroy();
  res.status(204).json({
    status: "success",
    message: "Role deleted successfully",
  });
});
