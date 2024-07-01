const Product = require("../models/Productmodel");
const sequelize = require("../connection/connection");
const getAllProducts = async (rqe, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json([...products]);
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: "Error fetching products",
    });
  }
};
const addProduct = async (req, res, next) => {
  const product = {
    name: req.body.name || "",
    img: req.body.img || "",
    seller: req.body.seller || "",
    price: req.body.price || 0,
  };
  const t = await sequelize.transaction();
  try {
    const result = await Product.create(product, { transaction: t });
    await t.commit();
    res.status(200).json({
      message: "Product added successfully",
    });
  } catch (e) {
    await t.rollback();
    res.status(404).json({
      message: "error",
    });
    console.log(e);
  }
};
const delproduct = async (req, res, next) => {
  const id = req.body.id;
  const t = await sequelize.transaction();
  try {
    const result = await Product.destroy({ where: { id: id } });
    await t.commit();
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    await t.rollback();
    res.status(404).json({ message: "Internal server error" });
  }
};
module.exports = { addProduct, delproduct, getAllProducts };
