// Routes decide which fun to run when user sends request

const express = require('express');
const router = express.Router();

// Import Controller Functions
const {addCategory, getCategories, updateCategory, deleteCategory} = require('../controllers/categoryController');

const adminMiddleware = require("../Middleware/adminMiddleware");
const authMiddleware = require("../Middleware/authMiddleware");
// importing validator
const {createCategoryValidator} = require ('../validators/categoryValidator');

router.post('/add-category',authMiddleware,adminMiddleware, createCategoryValidator, addCategory);
router.get('/get-categories', getCategories);
router.put('/update-category/:id',authMiddleware, adminMiddleware,updateCategory);
router.delete('/delete-category/:id',authMiddleware ,adminMiddleware,deleteCategory);

module.exports = router;