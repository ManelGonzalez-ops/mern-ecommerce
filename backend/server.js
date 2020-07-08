

const data = require("./data")
//1h perdida por no importal y ejecutarlo en la misma linea.
const dotenv = require("dotenv").config()
const config = require("./config")

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const UserRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoute")
const orderRouter = require("./routes/orderRoutes")
const PaymentRouter = require("./routes/paymentRoutes")
const bodyParser = require("body-parser")


const MONGODB_URL = config.MONGODB_URL
console.log(MONGODB_URL)
console.log(MONGODB_URL, "djsdfjsdn")
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(()=>{console.log("funca")})
.catch(err=>{console.log(err.message, "error")})


const app = express()
app.use(cors())
app.use(express.json())

app.use("/users", UserRouter)
app.use("/products", productRouter)
app.use("/orders", orderRouter)
app.use("/secret", PaymentRouter)
// app.use("", productRouter)

// app.get("/product/:id", (req, res)=>{
//     const id = req.params.id
//     const producto = data.products.find(item=>item._id === id)
//     res.send(producto)
// })

let PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log("server listening")
})