const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./src/models/UserModel");
const Product = require("./src/models/Productmodel");
const Cart = require("./src/models/CartModel");
const sequelize = require("./src/connection/connection");
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
const productRoutes = require("./src/routes/productroutes");
const userRoutes = require("./src/routes/userRoutes");
app.use("/product", productRoutes);
app.use("/user", userRoutes);
Cart.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
sequelize.sync().then(() => {
  console.log("Database Connected");
});
app.listen(5000, (err) => {
  if (!err) {
    console.log("server running on port 5000");
  }
});
