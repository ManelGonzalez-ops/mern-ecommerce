const { Order, OrderItem } = require("../models/orderModel")
const User = require("../models/userModel")
const Product = require("../models/productModel")
const express = require("express")
const router = express.Router()
const Modules = require("../utils")
const { isAuth } = Modules

router.post("/", async (req, res) => {
    try {
        console.log(req.body, "bodyy")
        console.log(req.body.userInfo, "userinfo")
        console.log(req.body.userInfo._id, "fucking id")
        console.log(req.body.shippingInfo, "shipppingg inffuuuue")

        const user = await User.findOne({ _id: req.body.userInfo._id })
        if (user) {

            //we should save the order after orderItems hava been save correctly
            const order = new Order({
                user: user._id,
                shipping: req.body.shippingInfo
            })

            // we should split orderItems and Orders in differnet funcitons

            const newOrder = await order.save()
            if (newOrder) {

                const orderItems = req.body.cartItems
                try {
                    let total = 0
                    let count = 0
                    const fetcher = () => new Promise(resolve => {
                        orderItems.forEach(async item => {

                            const product = await Product.findById(item.id)

                            if (product) {
                                total += parseInt(item.qty, 10) * product.price

                                const orderItem = new OrderItem({
                                    order: newOrder._id,
                                    product: item.id,
                                    quantity: item.qty
                                })
                                await orderItem.save()
                                count += 1
                            }

                            else {
                                res.status(401).send({ error: "our cart has a product that havent been found" })
                            }

                            if (count === orderItems.length) {
                                console.log(orderItems.length, "longitud")
                                console.log(count, "cuenta")
                                resolve()
                            }
                        })

                    })

                    await fetcher()
                    //si tienes que acualizar algo hazlo así, mongoose updates son una perdida de tiempo para soplapollas
                    const orderWithTotalCost = await Order.findById(newOrder._id)
                    if (orderWithTotalCost) {
                        orderWithTotalCost.totalCost = total
                        orderWithTotalCost.wentToCheckout = true
                        await orderWithTotalCost.save()

                        return res.status(201).send({ data: orderWithTotalCost })
                    }

                    else {
                        res.status(401).send("order not fouuuund")
                    }

                }
                catch (err) {
                    res.status(401).send({ data: `${err.message}   error with OrderItems` })
                }


            }
            else {
                res.status(401).send({ error: "order could be created" })
            }
        }
        else {
            res.status(401).send({ error: "user not found" })
        }
    }
    catch (err) {
        res.status(401).send({ error: `${err.message}` })
    }
})

router.get("/completed/:userId", async (req, res) => {

    try {
        const user = await User.findById(req.params.userId)
        if (user) {
            const userOrders = await Order.find({ user: req.params.userId, completed: true })
            console.log(userOrders, "que pasa que las userOrder")
            if (userOrders) {

                res.status(200).send({ data: { userOrders, user } })
            }
            else {
                res.status(401).send({ data: "no orders completed yet" })
            }
        }
        else {
            res.status(401).send({ data: "user not found" })
        }

    }
    catch (err) {
        res.status(401).send({ data: err.message })
    }
})


router.get("/order/:id", async (req, res) => {

    try {
        const orderItems = await OrderItem.find({ order: req.params.id })
        if (orderItems) {
            let orderItemsArray = [];
            const loopInBlock = () => new Promise(resolve => {
                orderItems.map(async (item) => {
                    const product = await Product.findById(item.product)
                    if (product) {
                        orderItemObject = {
                            name: product.name,
                            price: product.price, quantity: item.quantity
                        }
                        orderItemsArray = [...orderItemsArray, orderItemObject]
                        if (orderItemsArray.length === orderItems.length) {
                            resolve()
                        }
                    }
                    else {
                        return res.send("one of the products of orderItems wasnt found")
                    }
                })
            })
            await loopInBlock()
            console.log(orderItemsArray, "looos orderIIIIIItems")
            const order = await Order.findById(req.params.id)
            if (order) {
                console.log(order, "THEEE ORDEEER")
                res.status(200).send({ data: { orderItemsArray, order } })
            }
            else {
                res.status(401).send({ data: "order not found" })
            }
        }
        else {
            res.status(401).send({ data: "orderItems intances werent found" })
        }
    }
    catch (err) {
        res.status(401).send({ data: err.message })
    }


})




module.exports = router