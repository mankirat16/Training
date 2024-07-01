const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../connection/connection");
class User extends Sequelize.Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Book",
    indexes: [
      {
        fields: ["name"],
      },
    ],
    timestamps: false,
  }
);
module.exports = User;
