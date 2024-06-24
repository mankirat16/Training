const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../connection/db");

class UserQualification extends Sequelize.Model {}
UserQualification.init(
  {
    userQualificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: "UserQualification",
    timestamps: false,
  }
);

module.exports = UserQualification;
