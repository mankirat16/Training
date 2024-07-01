const express = require("express");
const {
  delAuthor,
  demonstrateIsolation,
} = require("../controllers/AuthorController");
const router = express.Router();
router.post("/del-author", delAuthor);
router.get("/show-isolation", demonstrateIsolation);
module.exports = router;
