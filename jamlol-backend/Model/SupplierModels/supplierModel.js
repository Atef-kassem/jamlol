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
    card_number: {
      type: DataTypes.INTEGER,
    },
    sgl_number: {
      type: DataTypes.INTEGER,
    },
    jwal: {
      type: DataTypes.STRING,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
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
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },

  {
    timestamps: true,
    tableName: "tbl_supplier",
  }
);

module.exports = Supplier;
