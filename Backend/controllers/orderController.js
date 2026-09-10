const OrderModel = require("../models/OrderModel");


// ================= CREATE ORDER =================

const createOrder = async (req, res) => {

    try {

        const user = req.user.id;

        const {
            items,
            totalAmount,
            address
        } = req.body;


        if (!items || items.length === 0) {

            return res.status(400).json({
                message: "Order items are required"
            });

        }


        const order = await OrderModel.create({

            user,

            items,

            totalAmount,

            address,

            status: "Pending"

        });


        res.status(201).json({

            message: "Order created successfully",

            order

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};



// ================= GET MY ORDERS =================

const getMyOrders = async (req, res) => {

    try {

        const user = req.user.id;


        const orders =
            await OrderModel.find({ user });


        res.status(200).json({

            orders

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {

    createOrder,
    getMyOrders

};