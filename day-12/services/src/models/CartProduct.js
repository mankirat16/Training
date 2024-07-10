const sequelize = require("../connection/connection");
const { Sequelize, DataTypes } = require("sequelize");
const Product = require("./Productmodel");
const Cart = require("./CartModel");

class CartItem extends Sequelize.Model {}
CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cart,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    qty: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CartItem",
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ["cartId", "productId"],
      },
    ],
  }
);
module.exports = CartItem;
