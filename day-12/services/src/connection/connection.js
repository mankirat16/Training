const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize(
//   "postgres://postgres:2916@:5433/postgres"
// );
const sequelize = new Sequelize("postgres", "postgres", "2916", {
  host: "db", // default PostgreSQL port
  dialect: "postgres",
});
module.exports = sequelize;
