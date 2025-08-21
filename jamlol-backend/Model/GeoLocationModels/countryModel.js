const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");

const Country = sequelize.define(
  "Country",
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
    tableName: "tbl_country",
  }
);

module.exports = Country;
