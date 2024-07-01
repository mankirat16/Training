const { sequelize } = require("../connection/connection");
const Book = require("../models/UserModel");
const Author = require("../models/SectionModel");
const getBookAuthor = async (req, res, next) => {
  try {
    const authorName = await Author.findOne({ where: { id: req.body.id } });
    res.json({ author: authorName });
  } catch (e) {
    console.log(e);
    res.send(401);
  }
};
const addBook = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const newBook = { name: req.body.name };
    const result = await Book.create(newBook, { transaction: t });
    const author = await Author.findOne({ where: { name: req.body.author } });
    console.log(author, "author");
    await author.addBooks(result, { transaction: t });
    await t.commit();
    res.send("user added");
  } catch (e) {
    await t.rollback();
    res.send("error");
  }
};
const getAllTasks = async (req, res, next) => {
  try {
    const data = await Book.findAll();
    res.json([...data]);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Error fetching tasks" });
  }
};

module.exports = { addBook, getAllTasks, getBookAuthor };
