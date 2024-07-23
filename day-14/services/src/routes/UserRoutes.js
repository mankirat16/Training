const express = require("express");
const { addUser, login } = require("../controllers/UserController");
const router = express.Router();
router.post("/add-user", addUser);
router.post("/login", login);
module.exports = router;
