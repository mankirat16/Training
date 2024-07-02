const { Router } = require("express");
const { addUser, login, getUsers } = require("../controllers/userController");
const {
  addToCart,
  removeFromCart,
  getAmount,
  getProducts,
} = require("../controllers/cartController");
const router = Router();
router.get("/all-users", getUsers);
router.post("/add-user", addUser);
router.post("/login", login);
router.post("/add-to-cart", addToCart);
router.post("/remove-from-cart", removeFromCart);
router.post("/total-amt", getAmount);
router.post("/view-cart", getProducts);
module.exports = router;
