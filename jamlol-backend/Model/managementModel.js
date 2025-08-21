const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/dbConfig");

const Management = sequelize.define(
  "Management",
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
  },
  {
    timestamps: true,
    tableName: "tbl_management",
  }
);

module.exports = Management;
