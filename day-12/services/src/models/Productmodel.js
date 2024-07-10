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
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
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
    indexes: [
      {
        unique: false,
        fields: ["id"],
      },
    ],
  }
);
module.exports = Product;
