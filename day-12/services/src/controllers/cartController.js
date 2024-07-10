// const Cart = require("../models/CartModel");
// const Product = require("../models/Productmodel");
// const addToCart = async (req, res, next) => {
//   try {
//     const { pId, id } = req.body;

//     const cart = await Cart.findOne({ where: { id } });
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     if (!(await cart.productIds.includes(pId))) {
//       let arr = cart.productIds;
//       await arr.push(pId);
//       await Cart.update({ productIds: arr }, { where: { id } });
//     }

//     res
//       .status(200)
//       .json({ message: "Product added to cart successfully", cart });
//   } catch (error) {
//     console.error("Error adding product to cart:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const removeFromCart = async (req, res, next) => {
//   try {
//     const pId = req.body.pId;
//     const cart = await Cart.findOne({
//       where: { id: req.body.id },
//     });
//     let arr = cart.productIds;
//     arr = await arr.filter((id) => {
//       return id !== pId;
//     });
//     await Cart.update({ productIds: arr }, { where: { id: req.body.id } });
//     res.json({ ...cart });
//   } catch (e) {
//     res.status(404);
//     console.log(e);
//   }
// };
// const getAmount = async (req, res, next) => {
//   console.log("mt");
//   let amount = 0;
//   try {
//     const cart = await Cart.findOne({
//       where: {
//         id: req.body.id,
//       },
//     });
//     console.log(cart.productIds.length);
//     cart.productIds.forEach(async (id, index) => {
//       const product = await Product.findOne({ where: { id: id } });
//       amount += product.price;
//       if (index === cart.productIds.length - 1) {
//         res.status(200).json({ amt: amount });
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(404).json("Internal server error");
//   }
// };
// const getProducts = async (req, res, next) => {
//   let products = [];
//   try {
//     const cart = await Cart.findOne({
//       where: { id: req.body.id },
//     });
//     cart.productIds.forEach(async (id, index) => {
//       const product = await Product.findOne({
//         where: { id: id },
//       });
//       products.push(product);
//       if (index === cart.productIds.length - 1) {
//         res.status(200).json([...products]);
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(404).json({
//       message: "Internal server error",
//     });
//   }
// };
// module.exports = { addToCart, removeFromCart, getAmount, getProducts };

const sequelize = require("../connection/connection");
const CartItem = require("../models/CartProduct");
const Product = require("../models/Productmodel");
const addToCart = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const item = {
      cartId: req.body.id,
      productId: req.body.pId,
      qty: 1,
    };
    const prev = await CartItem.findOne({
      where: {
        productId: item.productId,
        cartId: item.cartId,
      },
    });
    console.log(prev);
    if (prev) {
      item.qty = prev.dataValues.qty;
      await CartItem.update(
        { qty: item.qty + 1 },
        {
          where: {
            productId: item.productId,
            cartId: item.cartId,
          },
        }
      );
    } else await CartItem.create(item);
    await t.commit();
    res.status(200).json({
      message: "Product added successfully",
    });
  } catch (e) {
    await t.rollback();
    console.log(e);
    res.status(404).json({
      message: "error while adding the product",
    });
  }
};
const removeFromCart = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const item = {
      productId: req.body.productId,
      cartId: req.body.cartId,
    };
    const prev = await CartItem.findOne(
      {
        where: {
          productId: item.productId,
          cartId: item.cartId,
        },
      },
      { transaction: t }
    );
    if (prev.dataValues.qty === 1) {
      await CartItem.destroy({
        where: {
          productId: item.productId,
          cartId: item.cartId,
        },
      });
    } else {
      await CartItem.update(
        {
          qty: prev.dataValues.qty - 1,
        },
        {
          where: {
            productId: item.productId,
            cartId: item.cartId,
          },
        },
        { transaction: t }
      );
    }
    await t.commit();
    res.status(200).json({
      message: "Product deleted from cart",
    });
  } catch (e) {
    await t.rollback();
    res.status(404).json({
      message: "Error while deleting product",
    });
  }
};
const getAllProducts = async (req, res, next) => {
  try {
    const result = await CartItem.findAll({
      where: {
        cartId: req.body.cartId,
      },
    });

    res.status(200).json([...result]);
  } catch (e) {
    res.status(404).json({
      message: "Error while fetching products",
    });
  }
};
const getAmount = async (req, res, next) => {
  try {
    const result = await CartItem.findAll({
      where: {
        cartId: req.body.cartId,
      },
    });
    let amt = 0;
    result.forEach(async (item, index) => {
      const product = await Product.findOne({
        where: { id: item.productId },
      });
      amt = amt + product.dataValues.price * item.qty;
      if (index === result.length - 1) {
        res.status(200).json({ amount: amt });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(404).message({
      message: "error while fetching amount",
    });
  }
};
module.exports = {
  addToCart,
  removeFromCart,
  getAllProducts,
  getAmount,
};
