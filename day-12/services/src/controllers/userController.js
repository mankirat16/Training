const sequelize = require("../connection/connection");
const User = require("../models/UserModel");
const Cart = require("../models/CartModel");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const mailer = require("../mailer/mailer-service");
const genOtp = require("../otpGen");
const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "mankirat0816@gmail.com",
  },
];

const addUser = async (req, res, next) => {
  const user = {
    name: req.body.name || "",
    pwd: bcrypt.hashSync(req.body.pwd, salt) || "",
    role: req.body.role || "buyer",
    email: req.body.email,
  };
  const t = await sequelize.transaction();
  try {
    const result = await User.create(user, { transaction: t });
    const cartNew = await Cart.create({
      id: result.dataValues.id,
    });
    result.setCart(cartNew);
    await t.commit();

    res.status(200).json({
      message: "User added",
      cartId: result.dataValues.id,
    });
  } catch (e) {
    await t.rollback();
    res.status(404).json({ message: "Internal server error" });
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
    console.log(user, "user");
    if (user && bcrypt.compareSync(pwd, user.pwd) && user.role === role) {
      res.status(200).json({
        message: "logged in successfully",
        cartId: user.id,
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
const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json([...users]);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Internal server error" });
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json({
      ...user.dataValues,
    });
  } catch (e) {
    res.status(404).json({
      message: "Internal server error",
    });
    console.log(e);
  }
};
const sendOtp = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const otp = genOtp();
    await user.update({ otp: otp });
    mailer
      .send({
        from: sender,
        to: recipients,
        subject: "Reset Password",
        text: `Please enter this otp to reset your password ${otp}`,
        category: "Integration Test",
      })
      .then(console.log, console.error);
    res.status(200).json({ message: "otp sent successfully" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Server error" });
  }
};
const verifyOtp = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        otp: req.body.otp,
      },
    });
    if (user) {
      await user.update({
        pwd: bcrypt.hashSync(req.body.pwd, salt) || "",
      });
      console.log("user updated");
    }
    res.status(200).json({
      message: "password updated successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: "Server error",
    });
  }
};
module.exports = { addUser, login, getUsers, getUser, sendOtp, verifyOtp };
