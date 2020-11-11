const mongoose = require("mongoose")
const Product = require("./productModel")



const orderModel = new mongoose.Schema({

    completed: { type: Boolean, required: true, default: false },

    
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    totalCost: { type: Number, required: false, default: 0 },

    wentToCheckout : {type: Boolean, required: false, default: false},
    dateAdded: {type: Date, default: new Date(), required: true},

    shipping: {type: {}, required: true, default: {}}
})

//we need to add shipping
//we need to submit payment date just after the order is payed, not before.

const Order = mongoose.model("Order", orderModel)


// 













const orderItemModel = new mongoose.Schema({
    quantity: { type: Number, required: true },
    order: {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },


})


const OrderItem = mongoose.model("OrderItem", orderItemModel)

module.exports = {

    Order,
    OrderItem
}