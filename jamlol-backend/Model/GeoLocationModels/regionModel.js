const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");

const Region = sequelize.define(
  "Region",
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
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_city",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "tbl_region",
  }
);

module.exports = Region;
