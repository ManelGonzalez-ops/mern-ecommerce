const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    price: {type: Number, default:0, required: true},
    category: {type: [String], required: true,
    },
    stock: {type: Number, default: 0, required: true},
    description: {type: String, required: true},
    rating: {type: Number, default: 0, required: true},
    numReviews: {type: Number, default: 0, required: true},
    reviews: {type: [Object], required: false},
    date_added: {type: Date, default: new Date(), required: true}
})

const productModel = mongoose.model("Product", productSchema)
module.exports = productModel

