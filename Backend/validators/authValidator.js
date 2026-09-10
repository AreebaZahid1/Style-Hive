// Express Validator is a library used in Express.js 
// to check (validate) the data sent by the user before your route processes it

// body is function of express-validator
const {body} = require('express-validator');

// Validator stores data in array
const registerValidator = 
[
    // built-in functions
    body('name').notEmpty().withMessage('Name is Required'),
    body('email').notEmpty().withMessage('Email is Required').isEmail().withMessage('Invalid Email'),
    body('password').notEmpty().withMessage('Password is Required').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('number').notEmpty().withMessage('Number is Required').isNumeric().withMessage("Must be a number"),
    body('country').notEmpty().withMessage('Country is Required'),
    body('city').notEmpty().withMessage('City is Required'),
    body('postalCode').notEmpty().withMessage('Postal Code is Required'),
]   

const loginValidator = 
[
    body('email').notEmpty().withMessage('Email is Required').isEmail().withMessage('Invalid Email'),
    body('password').notEmpty().withMessage('Password is Required').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
]


module.exports = { registerValidator, loginValidator };