const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");

const NaqelRegion = sequelize.define(
  "NaqelRegion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    naqel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_naqel",
        key: "id",
      },
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_region",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "tbl_naqel_region",
  }
);

module.exports = NaqelRegion;