const sequelize = require("../connection/connection");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./UserModel");
class Alarm extends Sequelize.Model {}
Alarm.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      field: "userId",
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Alarms",
  }
);
module.exports = Alarm;
