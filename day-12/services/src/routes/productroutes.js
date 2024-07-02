const express = require("express");
const {
  addProduct,
  delproduct,
  getAllProducts,
  sortByPrice,
} = require("../controllers/productController");
const router = express.Router();
router.get("/all-products", getAllProducts);
router.post("/add-product", addProduct);
router.post("/del-product", delproduct);
router.get("/sort-products", sortByPrice);
module.exports = router;
