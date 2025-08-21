const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { Role, User, Permission } = require("../../Model");
const { where } = require("sequelize");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, person_type } = req.query;
  const offset = (page - 1) * limit;
  const whereClause = {};
  if (person_type) {
    whereClause.person_type = person_type;
  }
  const users = await User.findAndCountAll({
    where: whereClause,
    include: [
      { 
        model: Role, 
        attributes: ["name"],
      }
    ],
    attributes: { exclude: ["password"] },
    offset,
    limit,
  });

  res.status(200).json({
    status: "succeed",
    data: users.rows,
    totalCount: users.count,
    totalPages: Math.ceil(users.count / limit),
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    include: [
      { 
        model: Role, 
        attributes: ["name"],
        include: [
          {
            model: Permission,
            attributes: ["name", "slug"],
            through: { attributes: [] }
          }
        ]
      }
    ],
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "succeed",
    user,
  });
});


exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }

  // Handle file upload for photo
  let photoPath = user.photo;
  if (req.file) {
    photoPath = require('path').join('uploads', req.file.filename);
  }

  // Update multiple fields
  user.set({
    ...req.body,
    photo: photoPath,
  });

  await user.save();

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  await user.destroy();
  res.status(204).json({
    status: "success",
  });
});

exports.updateMyData = catchAsync(async (req, res, next) => {
  // TODO 1) check if user want change password

  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('if you want to change password go to "/updatepassword" ', 400));
  }

  // TODO 2) check if user want to change it's role  which isn't his responsability

  if (req.body.role) {
    return next(new AppError("you don't have permession to change your role ", 403));
  }

  // TODO 3) update user data

  const { _id } = req.user;
  const { name, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true }).select(
    "-password"
  );

  if (!updatedUser) {
    return next(new AppError("user doesn't exist or input data is invalid ", 404));
  }

  res.status(200).json({
    status: "succeed",
    updatedUser,
  });
});

exports.deActivateUser = catchAsync(async (req, res, next) => {
  // TODO 1) get user id from
  const { _id } = req.user;

  const deActivatedUser = await User.findByIdAndUpdate(
    _id,
    { active: false },
    { new: true, runValidators: true }
  ).select("-password");

  if (!deActivatedUser) {
    return next(new AppError("user doesn't exist or input data is invalid ", 404));
  }
  res.status(204).json({
    status: "succeed",
    data: null,
  });
});

exports.CreateUser = catchAsync(async (req, res, next) => {
  const { name, username, phone, email, address, password, person_type, approval_code, status, role_id } = req.body;

  // Handle file upload for photo
  let photoPath = null;
  if (req.file) {
    photoPath = require('path').join('uploads', req.file.filename);
  }

  // If role_id is provided, check if it exists
  if (role_id) {
    const roleData = await Role.findByPk(role_id);
    if (!roleData) {
      return next(new AppError("Role not found", 404));
    }
  }

  // Create user
  const newUser = await User.create({
    role_id: role_id || null,
    name,
    username,
    phone,
    email,
    photo: photoPath,
    address,
    password,
    person_type,
    approval_code,
    status,
  });

  if (!newUser) {
    return next(new AppError("Failed to create user", 400));
  }

  res.status(201).json({
    status: "succeed",
    message: "User created successfully",
    user: newUser,
  });
});

exports.assignRoleToUser = catchAsync(async (req, res, next) => {
  const{id} = req.params;
  const {role_id } = req.body;
  const user = await User.findByPk(id);

  if(!user){
    return next(new AppError("User not found", 404));
  }
  const role = await Role.findByPk(role_id);
  if(!role){
    return next(new AppError("Role not found", 404));
  }
 user.set({
  role_id,
});

await user.save();

res.status(200).json({
  status: "success",
  user,
});
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id, {
    include: [
      { 
        model: Role, 
        attributes: ["name"],
        include: [
          {
            model: Permission,
            attributes: ["name", "slug"],
            through: { attributes: [] }
          }
        ]
      }
    ],
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "succeed",
    data: user,
  });
});

// دالة جديدة لعرض صلاحيات المستخدم
exports.getUserPermissions = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  const user = await User.findByPk(id, {
    include: [
      { 
        model: Role, 
        attributes: ["id", "name"],
        include: [
          {
            model: Permission,
            attributes: ["id", "name", "slug"],
            through: { attributes: [] }
          }
        ]
      }
    ],
    attributes: ["id", "name", "username", "email"]
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (!user.Role) {
    return res.status(200).json({
      status: "succeed",
      message: "User has no role assigned",
      data: {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email
        },
        role: null,
        permissions: []
      }
    });
  }

  const permissions = user.Role.Permissions || [];

  res.status(200).json({
    status: "succeed",
    data: {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
      },
      role: {
        id: user.Role.id,
        name: user.Role.name
      },
      permissions: permissions.map(permission => ({
        id: permission.id,
        name: permission.name,
        slug: permission.slug
      }))
    }
  });
});

// دالة لعرض صلاحيات المستخدم الحالي
exports.getMyPermissions = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id, {
    include: [
      { 
        model: Role, 
        attributes: ["id", "name"],
        include: [
          {
            model: Permission,
            attributes: ["id", "name", "slug"],
            through: { attributes: [] }
          }
        ]
      }
    ],
    attributes: ["id", "name", "username", "email"]
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (!user.Role) {
    return res.status(200).json({
      status: "succeed",
      message: "You have no role assigned",
      data: {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email
        },
        role: null,
        permissions: []
      }
    });
  }

  const permissions = user.Role.Permissions || [];

  res.status(200).json({
    status: "succeed",
    data: {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
      },
      role: {
        id: user.Role.id,
        name: user.Role.name
      },
      permissions: permissions.map(permission => ({
        id: permission.id,
        name: permission.name,
        slug: permission.slug
      }))
    }
  });
});
