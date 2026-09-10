const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 500,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true,  // database mein record save krny k liye
    }
);

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;