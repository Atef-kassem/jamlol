const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    slug: {
      type: DataTypes.TEXT,
    },
    management_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tbl_management",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "tbl_permission",
  }
);

module.exports = Permission;
