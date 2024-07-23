const sequelize = require("../connection/connection");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const addUser = async (req, res, next) => {
  const user = {
    password: bcrypt.hashSync(req.body.pwd, salt) || "",
    email: req.body.email,
  };
  console.log(user, "USER");
  const t = await sequelize.transaction();
  try {
    const result = await User.create(user, { transaction: t });
    await t.commit();
    res.status(200).json({
      message: "User added",
      userId: result.dataValues.id,
    });
  } catch (e) {
    await t.rollback();
    res.status(404).json({ message: "Internal server error" });
    console.log(e);
  }
};
const login = async (req, res, next) => {
  const email = req.body.email;
  const pwd = req.body.pwd;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(user, "user");
    if (user && bcrypt.compareSync(pwd, user.password)) {
      res.status(200).json({
        message: "logged in successfully",
        userId: user.id,
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
module.exports = {
  addUser,
  login,
};
