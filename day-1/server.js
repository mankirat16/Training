// require("dotenv").config();
// const PORT = process.env.PORT || 5000;
// const express = require("express");
// const path = require("path");
// const app = express();
// app.use(express.static("./public"));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
// app.listen(PORT, (err) => {
//   if (err) console.log(err);
//   else console.log(`server running on port ${PORT}...`);
// });

const express = require("express");
const PORT = process.env.PORT || 5000;
const path = require("path");
const app = express();
const fs = require("fs");
app.use(express.urlencoded());
app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});
app.post("/login", (req, res) => {
  fs.readFile("./users.txt", "utf-8", (err, data) => {
    if (err) {
      res.send("internal server error");
      console.log("an error occurred " + err);
      return;
    }
    var users = JSON.parse(data);
    users = users.filter((user) => {
      return user.name === req.body.name && user.pwd == req.body.pwd;
    });
    if (users.length > 0) {
      res.send("logged in successfully");
    } else {
      res.send("Invalid username or password");
    }
  });
});
app.post("/signup", (req, res) => {
  fs.readFile("./users.txt", "utf-8", (err, data) => {
    if (err) {
      res.send("internal server error");
      console.log(err);
      return;
    }
    let users = JSON.parse(data);
    let temp = users.filter((user) => {
      return user.name === req.body.name;
    });
    if (temp.length > 0) {
      res.send("User already exists");
    } else {
      const obj = {};
      obj.name = req.body.name;
      obj.pwd = req.body.pwd;
      users.push(obj);
      fs.writeFile("./users.txt", JSON.stringify(users), (err) => {
        if (!err) {
          res.send(`Welcome ${req.body.name}!`);
          console.log("New user added");
        } else {
          res.send("Internal server error");
          console.log("an error occured...");
        }
      });
    }
  });
});
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`server running on port ${PORT}...`);
});
