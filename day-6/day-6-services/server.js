require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const pool = require("./src/db.js");
const routes = require("./src/routes.js");
app.use(express.urlencoded());
app.use(express.static("."));
app.use(express.json());
app.use(cors());
const getAllQuery = "SELECT * FROM students";
app.use(express.json());
app.get("/users", async (req, res) => {
  const data = await pool.query(getAllQuery);
  res.send(data.rows);
});
app.post("/addUser", async (req, res) => {
  const user = {};
  user.name = req.body.name;
  user.email = req.body.pwd;
  user.age = 21;
  user.dob = "16-08-2003";

  try {
    const query = `INSERT INTO students (name , email , age , dob) VALUES ($1, $2 , $3, $4);`;
    const res = await pool.query(query, [
      user.name,
      user.email,
      21,
      "16-08-2003",
    ]);
    console.log(res);
  } catch (e) {
    console.log("error " + e);
    res.send("Server error");
  }
});
app.delete("/users/:id", async (req, res) => {
  const query = `DELETE FROM students WHERE id = $1 RETURNING *`;
  try {
    const result = await pool.query(query, [req.params.id]);
    console.log(result);
    res.send("Deleted successfully");
  } catch (e) {
    console.log(e);
    res.sendStatus(501);
  }
});
app.put("/users/:id", async (req, res) => {
  const query = `
  UPDATE students 
  SET name = $1, email = $2, age = $3 ,dob = $4
  WHERE id = $5 
  RETURNING *`;
  const values = [req.body.name, req.body.pwd, 21, "16-08-2003", req.params.id];
  try {
    const response = await pool.query(query, values);
    res.send(response);
  } catch (e) {
    res.sendStatus(501);
  }
});
app.listen(PORT, (err) => {
  if (!err) console.log(`server running on port ${PORT}...`);
  else {
    console.log(err);
  }
});
