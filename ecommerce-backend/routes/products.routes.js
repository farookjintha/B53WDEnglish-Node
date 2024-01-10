const express = require('express');
const { getAllProducts, addNewProduct, updateProductById, deleteProductById } = require('../controllers/products.controllers');


const router = express.Router();

router.get('/products', getAllProducts )

router.post('/products', addNewProduct)

router.put('/products/:productId', updateProductById)

router.delete('/products/:productId', deleteProductById)



module.exports = router;