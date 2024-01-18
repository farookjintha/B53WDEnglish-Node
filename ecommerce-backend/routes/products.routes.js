const express = require("express");
const {
  getAllProducts,
  addNewProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/products.controllers");
const { isAuth } = require("../utils/authentication");

const router = express.Router();

router.get("/products", getAllProducts);

router.post("/products", isAuth, addNewProduct);

router.put("/products/:productId", isAuth, updateProductById);

router.delete("/products/:productId", isAuth, deleteProductById);

module.exports = router;
