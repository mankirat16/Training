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
      reference,
    },
  },
  {
    sequelize,
    modelname: "CartItem",
    timestamps: false,
  }
);
