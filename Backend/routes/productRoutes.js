const express = require('express');
const router = express.Router();

const { addProduct, getProducts, getProduct, updateProduct, deleteProducts } = require('../controllers/productController');

// const { createProductValidator } = require('../validators/productValidator');

const adminMiddleware = require("../Middleware/adminMiddleware");
const authMiddleware = require("../Middleware/authMiddleware");

// everyone can access these routes
router.get('/get-products', getProducts);
router.get('/get-product/:id', getProduct);

// admin can only access these routes
router.post('/add-product',authMiddleware, adminMiddleware, addProduct);
router.put('/update-product/:id',authMiddleware, adminMiddleware, updateProduct);
router.delete('/delete-product/:id', authMiddleware, adminMiddleware,deleteProducts);

module.exports = router;