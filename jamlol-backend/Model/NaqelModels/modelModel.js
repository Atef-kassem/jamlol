const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");

const Model = sequelize.define(
  "Model",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    tableName: "tbl_car_model",
  }
);

module.exports = Model;
