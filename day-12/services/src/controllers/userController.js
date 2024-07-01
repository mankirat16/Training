const sequelize = require("../connection/connection");
const User = require("../models/UserModel");
const Cart = require("../models/CartModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const addUser = async (req, res, next) => {
  const user = {
    name: req.body.name || "",
    pwd: bcrypt.hashSync(req.body.pwd, salt) || "",
    role: req.body.role || "user",
  };
  const t = await sequelize.transaction();
  try {
    const result = await User.create(user, { transaction: t });
    const cart = await Cart.create({
      id: result.dataValues.id,
      productIds: [],
    });
    cart.setUser(result);
    console.log(result.dataValues.id);
    await t.commit();
    res.status(200).json({
      message: "User added successfully",
    });
  } catch (e) {
    await t.rollback();
    res.status(404).json({
      message: "Internal server error",
    });
    console.log(e);
  }
};
const login = async (req, res, next) => {
  const name = req.body.name;
  const pwd = req.body.pwd;
  const role = req.body.role;
  try {
    const user = await User.findOne({
      where: {
        name: name,          
      },
    });
    if (user && bcrypt.compareSync(pwd, user.pwd) && user.role === role) {
      res.status(200).json({
        message: "logged in successfully",
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: "Internal server error",
    });
  }
};
module.exports = { addUser, login };
