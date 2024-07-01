const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");
class Product extends Sequelize.Model {}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seller: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    timestamps: false,
  }
);
module.exports = Product;
