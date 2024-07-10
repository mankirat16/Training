const sequelize = require("../connection/connection");
const { Sequelize, DataTypes } = require("sequelize");
class Cart extends Sequelize.Model {}
Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cart",
    timestamps: false,
  }
);
module.exports = Cart;
