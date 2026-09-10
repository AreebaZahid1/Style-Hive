const { body } = require("express-validator");


const createCartValidator = [

    body("product")
        .notEmpty()
        .withMessage("Product is required"),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1")

];


module.exports = {createCartValidator};