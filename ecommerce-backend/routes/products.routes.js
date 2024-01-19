const express = require("express");
const {
  getAllProducts,
  addNewProduct,
  updateProductById,
  deleteProductById,
  getAllAvailableOffers,
} = require("../controllers/products.controllers");
const { isAuth } = require("../utils/authentication");
const { isPrivilegedUser, isAdmin } = require("../utils/authorization");

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/offers", isAuth, isPrivilegedUser, getAllAvailableOffers);

router.post("/products", isAuth, isAdmin, addNewProduct);

router.put("/products/:productId", isAuth, isAdmin, updateProductById);

router.delete("/products/:productId", isAuth, isAdmin, deleteProductById);

module.exports = router;
