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
    productIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Cart",
    timestamps: false,
  }
);
module.exports = Cart;
