const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");

const RolePermission = sequelize.define(
  "RolePermission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "tbl_role", key: "id" },
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "tbl_permission", key: "id" },
    },
  },
  {
    timestamps: true,
    tableName: "tbl_role_permission",
  }
);

module.exports = RolePermission;
