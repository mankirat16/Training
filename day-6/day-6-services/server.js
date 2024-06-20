require("dotenv").config();
const multer = require("multer");
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const pool = require("./src/db.js");
app.use(express.urlencoded());
app.use(express.static("."));
app.use(express.json());
app.use(cors());
const getAllQuery = "SELECT * FROM students";
app.use(express.json());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const name = file.originalname;
    cb(null, name);
  },
});
// const upload = multer({ storage: storage });
const upload = multer({ storage: multer.memoryStorage() });
app.get("/users", async (req, res) => {
  const data = await pool.query(getAllQuery);
  res.send(data.rows);
});
app.get("/posts/:id", async (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM students WHERE id = $1`;
  const img = await pool.query(query, [userId]);
  console.log(img.rows[0].image);
  res.send(img.rows[0]);
});
app.post("/addUser", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const user = {};
  user.name = req.body.name;
  user.email = req.body.pwd;
  user.age = 21;
  user.dob = "16-08-2003";
  user.file = req.file.buffer;
  try {
    const query = `INSERT INTO students (name , email , age , dob,image) VALUES ($1, $2 , $3, $4 , $5);`;
    const res = await pool.query(query, [
      user.name,
      user.email,
      21,
      "16-08-2003",
      user.file,
    ]);
    console.log(res);
    // res.sendStatus(200);
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
