const express = require("express");

const router = express.Router();

const {createOrder,getMyOrders} = require("../controllers/orderController");

const authMiddleware = require("../Middleware/authMiddleware");


// Create order
router.post( "/create", authMiddleware, createOrder);
// Get my orders
router.get("/my-orders",authMiddleware,getMyOrders);

module.exports = router;