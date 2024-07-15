const Order = require("../models/OrderModel");
const sequelize = require("../connection/connection");
const mailer = require("../mailer/mailer-service");

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "mankirat0816@gmail.com",
  },
];

const makeOrder = async (req, res, next) => {
  const order = {
    address: req.body.address,
    cartId: req.body.cartId,
    userId: req.body.userId,
    paymentMethod: req.body.paymentMethod,
    status: "pending",
  };
  const t = await sequelize.transaction();
  try {
    const result = await Order.create(order, { transaction: t });
    await t.commit();
    mailer
      .send({
        from: sender,
        to: recipients,
        subject: "Order Confirmed",
        text: "Thanks for shopping with us , your order has been confirmed!",
        category: "Integration Test",
      })
      .then(console.log, console.error);
    res.status(200).json({
      message: " Order placed",
    });
  } catch (e) {
    await t.rollback();
    res.status(404).json({
      message: "Error while placing order",
    });
    console.log(e);
  }
};
const cancelOrder = async (req, res, next) => {
  try {
    await Order.destroy({
      where: { id: req.body.id },
    });
    mailer
      .send({
        from: sender,
        to: recipients,
        subject: "Order Cancellation",
        text: `Your order with order id ${req.body.id} has been cancelled`,
        category: "Integration Test",
      })
      .then(console.log, console.error);
    res.status(200).json({
      message: "Order cancelled successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: "Unable to cancel order",
    });
  }
};
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json([...orders]);
  } catch (e) {
    res.status(404).json({
      message: "Internal server error",
    });
  }
};
const updateStatus = async (req, res, next) => {
  try {
    await Order.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.status(200).json({
      message: "Order status updated successfully",
    });
  } catch (e) {
    res.status(404).json({
      message: "Internal server error",
    });
    console.log(e);
  }
};
module.exports = {
  makeOrder,
  cancelOrder,
  getOrders,
  updateStatus,
};
