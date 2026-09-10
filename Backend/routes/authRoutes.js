const express = require('express');
const router = express.Router();

// const upload = require("../Middleware/uploadMiddleware");

// Import Controller Functions
const {
	register,
	login,
	getProfile,
	updateProfile,
} = require('../controllers/authController');

//Import Validators
const { registerValidator, loginValidator } = require('../validators/authValidator');

const authMiddleware = require('../Middleware/authMiddleware');

// for register
router.post('/register', registerValidator, register);
// for login
router.post('/login', loginValidator, login);
// get profile
router.get('/me', authMiddleware, getProfile);
// update profile
router.put('/me', authMiddleware, updateProfile);

module.exports = router;