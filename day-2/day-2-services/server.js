require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded());
app.use(express.static("."));
app.use(express.json());

mongoose.connect(process.env.DB_URL).then((res) => {
  console.log("connected");
});
const db = require("./models/users");
app.get("/users", async (req, res) => {
  const data = await db.find();
  res.send(data);
});
app.post("/addUser", async (req, res) => {
  const user = {};
  user.name = req.body.name;
  user.pwd = req.body.pwd;
  try {
    const response = await db.create(user);
    res.send(response);
  } catch (e) {
    console.log("error " + e);
    res.send("Server error");
  }
});
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  db.findByIdAndDelete(id)
    .then(() => {
      res.send("Deleted successfully");
    })
    .catch((e) => {
      console.log(id);
      res.send("Error occured");
    });
});
app.put("/users/:id", async (req, res) => {
  const response = await db.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    pwd: req.body.name,
  });
  res.send(response);
});
app.listen(PORT, (err) => {
  if (!err) console.log(`server running on port ${PORT}...`);
  else {
    console.log(err);
  }
});
