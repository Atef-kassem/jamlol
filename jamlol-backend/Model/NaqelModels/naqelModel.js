const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");

const Naqel = sequelize.define(
  "Naqel",
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
    naqlen_type: {
      type: DataTypes.ENUM("person", "company"),
      allowNull: false,
    },
    identification_number: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    identification_type: {
      type: DataTypes.ENUM("card", "sgl"),
      allowNull: false,
    },
    jwal: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "inactive",
    },
  },
  {
    timestamps: true,
    tableName: "tbl_naqel",
  }
);

module.exports = Naqel;