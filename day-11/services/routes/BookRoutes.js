const express = require("express");
const {
  addBook,
  getAllTasks,
  getBookAuthor,
} = require("../controllers/UserController");
const router = express.Router();
router.post("/add-book", addBook);
router.get("/all-books", getAllTasks);
router.post("/get-author", getBookAuthor);
module.exports = router;
