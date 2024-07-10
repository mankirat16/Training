// const sequelize = require("../connection/connection");
// const { Sequelize, DataTypes } = require("sequelize");
// class User extends Sequelize.Model {}
// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     pwd: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false,
//     },
//     paymentMethods: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       allowNull: true,
//     },
//     role: {
//       type: DataTypes.ENUM,
//       values: ["admin", "buyer", "seller", "support"],
//     },
//     cartId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "Carts",
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     modelName: "Users",
//     timestamps: false,
//     indexes: [
//       {
//         unique: true,
//         fields: ["email", "id"],
//       },
//     ],
//   }
// );
// module.exports = User;

const sequelize = require("../connection/connection");
const { Sequelize, DataTypes } = require("sequelize");
class User extends Sequelize.Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    paymentMethods: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "buyer", "seller", "support"],
    },
    otp: {
      type: DataTypes.INTEGER,
    },
    cartId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Carts",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Users",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["email", "id"],
      },
    ],
  }
);
module.exports = User;
