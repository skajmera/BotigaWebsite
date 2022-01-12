const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: String,

    },
    price: {
        type: Number,
        required: true
    },
    profile: {
        type: String
    },
    userId: {
        type: String
    },
    description: {
        type: String
    },
    brand: {
        type: String
    },
    prodId: {
        type: String
    }

}, { timestamps: true })
const Product = mongoose.model("products", ProductSchema);
module.exports = Product;
