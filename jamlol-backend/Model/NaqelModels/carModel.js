const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");

const Car = sequelize.define(
  "Car",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    plate_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    license_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    license_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    insurance_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_naqel_driver",
        key: "id",
      },
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_car_model",
        key: "id",
      },
    },
    naqel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_naqel",
        key: "id",
      },
    },
    allowed_cars_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    allowed_drivers_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "tbl_naqel_car",

  }
);

module.exports =Car;
