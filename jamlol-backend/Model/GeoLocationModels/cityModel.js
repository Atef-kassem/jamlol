const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");

const City = sequelize.define(
  "City",
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
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tbl_country",
          key: "id",
        },
      },
  },
  {
    timestamps: true,
    tableName: "tbl_city",
  }
);

module.exports = City;
