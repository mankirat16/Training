const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./src/models/UserModel");
const Product = require("./src/models/Productmodel");
const Cart = require("./src/models/CartModel");
const CartItem = require("./src/models/CartProduct");
const mailer = require("./src/mailer/mailer-service");
const Order = require("./src/models/OrderModel");
const sequelize = require("./src/connection/connection");
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
const productRoutes = require("./src/routes/productroutes");
const userRoutes = require("./src/routes/userRoutes");
app.use("/product", productRoutes);
app.use("/user", userRoutes);
User.hasOne(Cart);
Cart.belongsTo(User);
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

sequelize.sync().then(() => {
  console.log("Database Connected");
});
// const sender = {
//   email: "mailtrap@demomailtrap.com",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   {
//     email: "mankirat0816@gmail.com",
//   },
// ];
// mailer
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "This is test email!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
app.listen(5000, (err) => {
  if (!err) {
    console.log("server running on port 5000");
  }
});
