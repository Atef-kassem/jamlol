const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");

const Driver = sequelize.define(
  "Driver",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    driver_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    naqel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_naqel",
        key: "id",
      },
    },
    license_num: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    license_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "tbl_naqel_driver",
  }
);

module.exports = Driver;
