const CartModel = require("../models/CartModel");


const addToCart = async (req, res) => {

    try {

        // Get logged-in user's ID
        const user = req.user.id;

        const {
            product,
            quantity
        } = req.body;


        // Check product
        if (!product) {

            return res.status(400).json({
                message: "Product is required"
            });

        }


        // Check quantity
        if (!quantity || quantity < 1) {

            return res.status(400).json({
                message: "Quantity must be at least 1"
            });

        }


        // Find user's cart
        let cart = await CartModel.findOne({
            user
        });


        // If cart doesn't exist
        if (!cart) {

            cart = await CartModel.create({

                user,

                items: [
                    {
                        product,
                        quantity
                    }
                ]

            });


            return res.status(201).json({

                message: "Product added to cart",

                cart

            });

        }


        // Check if product already exists
        const existingItem =
            cart.items.find(

                item =>
                    item.product.toString() === product

            );


        if (existingItem) {

            // Increase quantity
            existingItem.quantity += quantity;

        } else {

            // Add new product
            cart.items.push({

                product,
                quantity

            });

        }


        await cart.save();


        res.status(200).json({

            message: "Product added to cart",

            cart

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};



// ================= GET CART =================

const getCart = async (req, res) => {

    try {

        // Get logged-in user
        const user = req.user.id;


        const cart =
            await CartModel
                .findOne({ user })
                .populate("items.product");


        // No cart yet
        if (!cart) {

            return res.status(200).json({

                cart: {
                    user,
                    items: []
                }

            });

        }


        res.status(200).json({

            cart

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};



// ================= UPDATE CART =================

const updateCart = async (req, res) => {

    try {

        const user = req.user.id;

        const {
            product,
            quantity
        } = req.body;


        if (!product) {

            return res.status(400).json({
                message: "Product is required"
            });

        }


        if (!quantity || quantity < 1) {

            return res.status(400).json({
                message: "Quantity must be at least 1"
            });

        }


        const cart =
            await CartModel.findOne({
                user
            });


        if (!cart) {

            return res.status(404).json({
                message: "Cart not found"
            });

        }


        const item =
            cart.items.find(

                item =>
                    item.product.toString() === product

            );


        if (!item) {

            return res.status(404).json({
                message: "Product not found in cart"
            });

        }


        // Change quantity
        item.quantity = quantity;


        await cart.save();


        res.status(200).json({

            message: "Cart updated successfully",

            cart

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};



// ================= REMOVE FROM CART =================

const removeFromCart = async (req, res) => {

    try {

        const user = req.user.id;

        const {
            product
        } = req.body;


        if (!product) {

            return res.status(400).json({
                message: "Product is required"
            });

        }


        const cart =
            await CartModel.findOne({
                user
            });


        if (!cart) {

            return res.status(404).json({
                message: "Cart not found"
            });

        }


        // Remove product
        cart.items =
            cart.items.filter(

                item =>
                    item.product.toString() !== product

            );


        await cart.save();


        res.status(200).json({

            message: "Product removed from cart",

            cart

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};



module.exports = {

    addToCart,
    getCart,
    updateCart,
    removeFromCart

};