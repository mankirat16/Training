require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("multer");
app.use(cors());
app.use(express.urlencoded());
app.use(express.static("."));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"));
const storage = multer.diskStorage({      
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const name = file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });
const secret = process.env.TOKEN_SECRET;
mongoose.connect(process.env.DB_URL).then((res) => {
  console.log("connected");
});
const db = require("./models/users");
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("hello");
});
app.listen(PORT, (err) => {
  if (!err) console.log(`server running on port ${PORT}...`);
  else {
    console.log(err);
  }
});
 