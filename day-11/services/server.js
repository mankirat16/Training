const PORT = 5000;
const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require("./connection/connection");
const Book = require("./models/UserModel");
const Author = require("./models/SectionModel");
const bookRoutes = require("./routes/BookRoutes");
const authorRoutes = require("./routes/AuthorRoutes");
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
Book.belongsTo(Author, {
  onDelete: "CASCADE",
});
Author.hasMany(Book, {
  onDelete: "CASCADE",
});
sequelize.sync().then(() => {
  console.log("Db synced");
});
app.use("/book", bookRoutes);
app.use("/author", authorRoutes);
app.listen(PORT, (e) => {
  if (!e) {
    console.log("server running");
  }
});
