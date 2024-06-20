require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const connectionString = "postgres://postgres:2916@localhost:5433/postgres";
const sequelize = new Sequelize(connectionString);
module.exports = sequelize;
