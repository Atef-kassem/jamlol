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
const Client = require("./ClientsModels/clientModel");
const Supplier = require("./SupplierModels/supplierModel");
const Naqel = require("./NaqelModels/naqelModel");
const Car = require("./NaqelModels/carModel");
const Driver = require("./NaqelModels/driverModel");
const Model = require("./NaqelModels/modelModel");
const NaqelRegion = require("./NaqelModels/naqelRegionsModel");

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

//Region to Client (One-to-Many)
Region.hasMany(Client, { foreignKey: "region_id" });
Client.belongsTo(Region, { foreignKey: "region_id" });

//Region to Supplier (One-to-Many)
Region.hasMany(Supplier, { foreignKey: "region_id" });
Supplier.belongsTo(Region, { foreignKey: "region_id" });

//Region to Naqel (Many-to-Many)
Region.belongsToMany(Naqel, { through: NaqelRegion, foreignKey: "region_id" });
Naqel.belongsToMany(Region, { through: NaqelRegion, foreignKey: "naqel_id" });
NaqelRegion.belongsTo(Naqel, { foreignKey: "naqel_id" });
NaqelRegion.belongsTo(Region, { foreignKey: "region_id" });
Naqel.hasMany(NaqelRegion, { foreignKey: "naqel_id" });
Region.hasMany(NaqelRegion, { foreignKey: "region_id" });

Naqel.hasMany(Driver, { foreignKey: "naqel_id" });
Driver.belongsTo(Naqel, { foreignKey: "naqel_id" });

Naqel.hasMany(Car, { foreignKey: "naqel_id" });
Car.belongsTo(Naqel, { foreignKey: "naqel_id" });

Driver.hasOne(Car, { foreignKey: "driver_id" });
Car.belongsTo(Driver, { foreignKey: "driver_id" });

Car.belongsTo(Model, { foreignKey: "model_id" });
Model.hasOne(Car, { foreignKey: "model_id" });

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
  Client,
  Naqel,
  NaqelRegion,
  Car,
  Driver,
  Model,
};
