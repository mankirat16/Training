const { Datatypes, Sequelize } = require("sequelize");
const sequelize = require("../connection/connection");
class User extends Sequelize.Model {}
User.init(
  {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    model: "user",
    timestamps: false,
  }
);
module.exports = User;
