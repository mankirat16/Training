const Cart = require("../models/CartModel");
const Product = require("../models/Productmodel");
const addToCart = async (req, res, next) => {
  try {
    const { pId, id } = req.body;

    const cart = await Cart.findOne({ where: { id } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!(await cart.productIds.includes(pId))) {
      let arr = cart.productIds;
      await arr.push(pId);
      await Cart.update({ productIds: arr }, { where: { id } });
    }

    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const pId = req.body.pId;
    const cart = await Cart.findOne({
      where: { id: req.body.id },
    });
    let arr = cart.productIds;
    arr = await arr.filter((id) => {
      return id !== pId;
    });
    await Cart.update({ productIds: arr }, { where: { id: req.body.id } });
    res.json({ ...cart });
  } catch (e) {
    res.status(404);
    console.log(e);
  }
};
const getAmount = async (req, res, next) => {
  console.log("mt");
  let amount = 0;
  try {
    const cart = await Cart.findOne({
      where: {
        id: req.body.id,
      },
    });
    console.log(cart.productIds.length);
    cart.productIds.forEach(async (id, index) => {
      const product = await Product.findOne({ where: { id: id } });
      amount += product.price;
      if (index === cart.productIds.length - 1) {
        res.status(200).json({ amt: amount });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(404).json("Internal server error");
  }
};
const getProducts = async (req, res, next) => {
  let products = [];
  try {
    const cart = await Cart.findOne({
      where: { id: req.body.id },
    });
    cart.productIds.forEach(async (id, index) => {
      const product = await Product.findOne({
        where: { id: id },
      });
      products.push(product);
      if (index === cart.productIds.length - 1) {
        res.status(200).json([...products]);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: "Internal server error",
    });
  }
};
module.exports = { addToCart, removeFromCart, getAmount, getProducts };
