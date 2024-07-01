const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");
class Section extends Sequelize.Model {}
Section.init(
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
    modelName: "Author",
    indexes: [
      {
        fields: ["name"],
      },
    ],
    timestamps: false,
  }
);
module.exports = Section;
