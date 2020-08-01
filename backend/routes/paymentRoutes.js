const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const { Order, OrderItem } = require("../models/orderModel")
const stripe = require('stripe')('sk_test_51GycRPCpj3YNAXYJApak0y8nle3f51jfsRbIsR6QvbPp0djjc55AgyZJj92phShkWJCwSKYKtwvy04f2SvvSsMIc00i9eEULvw');




router.post('/', async (req, res) => {
  console.log(req.body, "elllllll boody")
  try {
    const user = await User.findById(req.body.idUser)
    if (user) {

      const order = await Order.findOne({ _id: req.body.idOrder, completed: false })


      if (order) {
        console.log(order.user, req.body.idUser, "cooooooomemememlalalala")
        if (order.user == req.body.idUser) {
          console.log(order.totalCost, "coooste total")
          const paymentIntent = await stripe.paymentIntents.create({
            //multiplicamos x100 porque los anormales de Stripe toman las cifras como céntimos
            amount: Math.round(order.totalCost * 100),
            currency: 'usd',
            // Verify your integration in this guide by including this parameter
            metadata: { integration_check: 'accept_a_payment' },
          });
          console.log(paymentIntent, "El puto payment intend")
          res.status(201).send({ client_secret: paymentIntent.client_secret })
        }
        else{
          res.status(401).json("order is wrong")
        }
      }
      else {
        res.status(401).json("user not foundmmmmmmmmmmmmmmm")
      }
    }
    else {
      res.status(401).json("user not found")
    }
  }

  catch (err) {
    res.status(401).send({ data: err.message })
  }

});




router.post("/success", async (req, res) => {
  try {
    const order = await Order.findById(req.body.id)

    if (order) {
      order.completed = true
      order.dateAdded = new Date()
      await order.save()
      res.status(201).send({ data: "success" })
    }
    else {
      res.status(401).send({ error: "order not found" })
    }
  }
  catch (err) {
    res.status(401).send({ error: err.message })
  }


})

module.exports = router