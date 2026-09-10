const express = require("express");

const router = express.Router();

const {addToCart,getCart,updateCart,removeFromCart} = require("../controllers/cartController");
const {createCartValidator} = require("../validators/cartValidator");

const authMiddleware = require("../Middleware/authMiddleware");

router.post("/add", authMiddleware, createCartValidator, addToCart);
router.get("/get-cart", authMiddleware, getCart);
router.put("/update", authMiddleware, updateCart);
router.delete("/remove", authMiddleware, removeFromCart);


module.exports = router;