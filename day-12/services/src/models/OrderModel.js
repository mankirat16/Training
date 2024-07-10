const sequelize = require("../connection/connection");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./UserModel");
const Cart = require("./CartModel");
class Order extends Sequelize.Model {}
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cartId: {
      type: DataTypes.INTEGER,
      references: {
        model: Cart,
        key: "id",
      },
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM,
      values: ["Credit Card", "Debit Card", "Net Banking", "COD"],
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "accepted", "rejected", "dispatched", "delivered"],
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Order",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
  }
);
module.exports = Order;
