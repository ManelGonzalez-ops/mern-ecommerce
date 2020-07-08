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

// orderItemModel.pre("save", async function(next) {
//     //buscamos la orden que contiene el orderItem que estamos guardando
//     console.log(this)
//     console.log(this.product, "id del producto")
   
//     try {
//         const order = await Order.findOne({ _id: this.order })
//         console.log(order, "la orden nena")
//         try {
            
//             const product = await Product.findById(this.product)
//             console.log(product, "objecto del producto")
//             console.log(product.price, "precio del producto")
//             try {

//                 const orderItemCost = product.price * this.quantity
//                 console.log(orderItemCost, "coste total del item")
//                 const total = order.totalCost + orderItemCost
//                 console.log(total, "coste actual de la orden en variable")
                
//                 console.log(order.totalCost, "coste actual de la orden en predb")
//                 try{
//                     await order.update({totalCost: total})
//                     console.log(order.totalCost, "cost een la db")
//                     if(order){
//                         console.log(order.totalCost, "coste actual de la orden en db")
//                         next()
//                     }
//                     else{
//                         console.log("error order totalCost not updated")
//                     }
//                 }
//                 catch (err) {
//                     console.log(err, "error bitch, operacion")
//                 }
                
//             }
//             catch (err) {
//                 console.log(err, "error bitch, operacion")
//             }
//         }
//         catch (err) {
//             console.log(err, "error bitch, product")
//         }

//     }
//     catch (err) {
//         console.log(err, "error bitch, order")
//     }

// })

const OrderItem = mongoose.model("OrderItem", orderItemModel)

module.exports = {

    Order,
    OrderItem
}