const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:2916@localhost:5433/postgres"
);
module.exports = sequelize;
