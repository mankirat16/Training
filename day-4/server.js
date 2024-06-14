// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const PORT = process.env.PORT || 5000;
// const app = express();
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const path = require("path");
// const jwt = require("jsonwebtoken");
// app.use(cors());
// app.use(express.urlencoded());
// app.use(express.static("."));
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static("./public"));
// const secret = process.env.TOKEN_SECRET;
// mongoose.connect(process.env.DB_URL).then((res) => {
//   console.log("connected");
// });
// const db = require("./models/users");
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/login.html"));
// });
// app.get("/dashboard", (req, res) => {
//   let verify;
//   if (req.cookies.user) verify = jwt.verify(req.cookies.user, secret);
//   if (verify) res.sendFile(path.join(__dirname, "public/dashboard.html"));
//   else res.redirect("/");
// });
// app.post("/login", async (req, res) => {
//   const user = await db.find({ name: req.body.name }, { pwd: req.body.pwd });
//   if (user.length === 0) res.send("Invalid username or password");
//   else {
//     const token = jwt.sign({ ...user[0] }, secret);
//     res.cookie("user", token);
//     res.redirect("/dashboard");
//   }
// });
// app.post("/signup", async (req, res) => {
//   const user = {};
//   user.name = req.body.name;
//   user.pwd = req.body.pwd;
//   const oldUser = await db.find({ name: req.body.name });
//   const token = jwt.sign({ ...oldUser[0] }, secret);
//   if (oldUser.length != 0) {
//     res.cookie("user", token);
//     res.redirect("/");
//   } else {
//     res.cookie("user", token);
//     const userMade = await db.create(user);
//     if (userMade) {
//       res.redirect("/dashboard");
//     }
//   }
// });
// app.get("/logout", (req, res) => {
//   res.clearCookie("user");
//   res.redirect("/");
// });
// app.listen(PORT, (err) => {
//   if (!err) console.log(`server running on port ${PORT}...`);
//   else {
//     console.log(err);
//   }
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.urlencoded());
app.use(express.static("."));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"));
const secret = process.env.TOKEN_SECRET;
mongoose.connect(process.env.DB_URL).then((res) => {
  console.log("connected");
});
const db = require("./models/users");
const { send } = require("process");
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});
function authToken(req, res, next) {
  const headers = req.headers["headers"];
  const token = headers && headers.split("")[1];
  if (token == null) res.sendStatus(401);
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      res.send(401);
      return;
    }
    req.user = user;
    next();
  });
}
app.get("/dashboard", (req, res) => {
  let verify;
  if (req.cookies.user) verify = jwt.verify(req.cookies.user, secret);
  if (verify) res.sendFile(path.join(__dirname, "public/dashboard.html"));     
  else res.redirect("/");
});
app.get('/posts',authToken,(req,res)=>{
          
})
app.post("/login", async (req, res) => {
  const user = await db.find({ name: req.body.name }, { pwd: req.body.pwd });
  if (user.length === 0) res.send("Invalid username or password");
  else {
    const token = jwt.sign({ ...user[0] }, secret);
    res.json({ token: token });
  }
});
app.post("/signup", async (req, res) => {
  const user = {};
  user.name = req.body.name;
  user.pwd = req.body.pwd;
  const oldUser = await db.find({ name: req.body.name });
  const token = jwt.sign({ ...oldUser[0] }, secret);
  if (oldUser.length != 0) {
    res.cookie("user", token);
    res.redirect("/");
  } else {
    res.cookie("user", token);
    const userMade = await db.create(user);
    if (userMade) {
      res.redirect("/dashboard");
    }
  }
});
app.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/");
});
app.listen(PORT, (err) => {
  if (!err) console.log(`server running on port ${PORT}...`);
  else {
    console.log(err);
  }
});
