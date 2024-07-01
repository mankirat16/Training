const { Router } = require("express");
const { addUser, login } = require("../controllers/userController");
const { addToCart, removeFromCart, getAmount } = require("../controllers/cartController");
const router = Router();
router.post("/add-user", addUser);
router.post("/login", login);
router.post("/add-to-cart", addToCart);
router.post("/remove-from-cart", removeFromCart);
router.post("/total-amt" , getAmount);
module.exports = router;
