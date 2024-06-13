require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(cors());
app.use(express.urlencoded());
app.use(express.static("."));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"));

app.use(
  session({
    saveUninitialized: true,
    resave: false,
    secret: "asdf1323f3f2f",
    cookie: { maxAge: 400000 },
  })
);
mongoose.connect(process.env.DB_URL).then((res) => {
  console.log("connected");
});
const db = require("./models/users");
app.get("/", (req, res) => {
  if (req.session.username) res.redirect("/dashboard   ");
  res.sendFile(path.join(__dirname, "public/login.html"));
});
app.get("/dashboard", (req, res) => {
  if (req.session.name)
    res.sendFile(path.join(__dirname, "public/dashboard.html"));
  else res.redirect("/");
});
app.post("/login", async (req, res) => {
  const user = await db.find({ name: req.body.name }, { pwd: req.body.pwd });
  if (user.length === 0) res.send("Invalid username or password");
  else {
    req.session.name = req.body.name;
    res.redirect("/dashboard");
  }
});
app.post("/signup", async (req, res) => {
  const user = {};
  user.name = req.body.name;
  user.pwd = req.body.pwd;
  const oldUser = await db.find({ name: req.body.name });
  if (oldUser.length != 0) {
    res.redirect("/");
  } else {
    const userMade = await db.create(user);
    if (userMade) {
      req.session.name = req.body.name;
      res.redirect("/dashboard");
    }
  }
});
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
app.listen(PORT, (err) => {
  if (!err) console.log(`server running on port ${PORT}...`);
  else {
    console.log(err);
  }
});
