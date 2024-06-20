require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "students",
  password: process.env.DB_PWD,
  port: 5433,
});
module.exports = pool;
