const { sequelize } = require("../Config/dbConfig");
const User = require("./userModel");
const Role = require("./RBACModels/roleModel");
const Permission = require("./RBACModels/permissionModel");
const RolePermission = require("./RBACModels/role_permissionModel");
const Management = require("./managementModel");
const Country = require("./GeoLocationModels/countryModel");
const City = require("./GeoLocationModels/cityModel");
const Region = require("./GeoLocationModels/regionModel");
const AppInfo = require("./appInfoModel");
const Supplier = require("./SupplierModels/supplierModel");
const Naqlen = require("./NaqlenModels/naqlenModel");

// Users to Roles (One-to-Many)
User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });

// Roles to Permissions (Many-to-Many)
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "role_id", onDelete: "CASCADE" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permission_id", onDelete: "CASCADE" });
RolePermission.belongsTo(Role, { foreignKey: "role_id", onDelete: "CASCADE" });
RolePermission.belongsTo(Permission, { foreignKey: "permission_id", onDelete: "CASCADE" });
Role.hasMany(RolePermission, { foreignKey: "role_id", onDelete: "CASCADE" });
Permission.hasMany(RolePermission, { foreignKey: "permission_id", onDelete: "CASCADE" });

//Permission to Management (One-to-Many)
Permission.belongsTo(Management, { foreignKey: "management_id" });
Management.hasMany(Permission, { foreignKey: "management_id" });

//Country to City (One-to-Many)
Country.hasMany(City, { foreignKey: "country_id" });
City.belongsTo(Country, { foreignKey: "country_id" });

//City to Region (One-to-Many)
City.hasMany(Region, { foreignKey: "city_id" });
Region.belongsTo(City, { foreignKey: "city_id" });

//Region to Supplier (One-to-Many)
Region.hasMany(Supplier, { foreignKey: "region_id" });
Supplier.belongsTo(Region, { foreignKey: "region_id" });

//Region to Naqlen (One-to-Many)
Region.hasMany(Naqlen, { foreignKey: "region_id" });
Naqlen.belongsTo(Region, { foreignKey: "region_id" });

module.exports = {
  User,
  Role,
  Permission,
  RolePermission,
  Region,
  City,
  Country,
  Management,
  AppInfo,
  Supplier,
  Naqlen,
};
