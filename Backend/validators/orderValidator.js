const { body } = require("express-validator");

const createOrderValidator = [
    body("user").notEmpty().withMessage("User is required"),
    body("items").notEmpty().withMessage("Items is required"),
];

module.exports = { createOrderValidator };