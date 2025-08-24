const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Config/dbConfig");

const Supplier = sequelize.define(
  "Supplier",
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
    supplier_type: {
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
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_region",
        key: "id",
      },
    },
    active: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "inactive",
    },
  },
  {
    timestamps: true,
    tableName: "tbl_supplier",
  }
);

module.exports = Supplier;
