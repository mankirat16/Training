const { Router } = require("express");
const {
  addUser,
  login,
  getUsers,
  getUser,
  sendOtp,
  verifyOtp,
} = require("../controllers/userController");
const {
  addToCart,
  removeFromCart,
  getAllProducts,
  getAmount,
} = require("../controllers/cartController");
const {
  makeOrder,
  cancelOrder,
  getOrders,
} = require("../controllers/orderController");
const { getCartProducts } = require("../controllers/productController");
const router = Router();
router.get("/all-users", getUsers);
router.post("/view-user", getUser);
router.post("/add-user", addUser);
router.post("/login", login);
router.patch("/add-to-cart", addToCart);
router.patch("/remove-from-cart", removeFromCart);
router.post("/total-amt", getAmount);
router.post("/view-cart", getAllProducts);
router.post("/make-order", makeOrder);
router.post("/cancel-order", cancelOrder);
router.post("/get-cart", getCartProducts);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/all-orders", getOrders);
module.exports = router;
