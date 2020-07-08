const express = require("express")
const Product = require("../models/productModel")
const router = express.Router()

//we have to import multiple requires like this
const Modules = require("../utils")
const { isAuth, isAdmin } = Modules

router.get("/", async (req, res) => {
    try {
        //get all products of the db
        const products = await Product.find({})
        res.send({ data: products })
    }
    catch (err) {
        res.status(401).send({ message: err.message })
    }

})

router.post("/", isAuth, isAdmin, async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            description: req.body.description,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
        })
        const newProduct = await product.save()
        if (newProduct) {
            return res.status(201).send({
                message: "product created",
                data: newProduct
            })

        }

        //here as we are returning dont need for else statement
        return res.status(401).send("product not valid")
    }
    catch (err) {
        res.status(401).json({ message: err.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.send(product)
        }
        else {
            res.status(401).json({ message: "product not found" })
        }
    }
    catch (err) {
        res.status(401).json({ message: err.message, kaka: "mamala" })
    }

})


router.put("/update", isAuth, isAdmin, async (req, res) => {

    try {
        const product = await Product.findOne({ _id: req.body._id })
        if (product) {
            product.name = req.body.name
            product.image = req.body.image
            product.brand = req.body.brand
            product.price = req.body.price
            product.category = req.body.category
            product.stock = req.body.stock
            product.description = req.body.description

            const newProduct = await product.save()
            if (newProduct) {
                // status 200 is reserved for updates
                return res.status(200).send({ data: newProduct })
            }
            else {
                return res.status(401).send({ message: "product cant be updatesdsddd" })
            }
        }
        else {
            return res.status(401).send({ message: "product cant be updated" })
        }
    }
    catch (err) {
        return res.status(401).send({ message: err.message })
    }
})

//y could have made .findone and the .remove()
router.delete("/", isAuth, isAdmin, async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.body._id }, (err, product) => {

            if (!err) {

                res.send({ data: product })
            }
            else {

                res.status(401).send({ message: "product not found" })
            }
        })
    }
    catch (err) {
        res.status(401).send({ message: err.message })
    }
})

router.put("/review", async (req, res) => {
    //como mejora podríamos añadir el id del usuario que hace la review
    try {
        const product = await Product.findById(req.body.productId)
        if (product) {
            const newReview = { review: req.body.review, rating: parseInt(req.body.rating, 10), author: req.body.author }
            const review = [...product.reviews, newReview]
            product.reviews = review
            const updatedProduct = await product.save()

            if (updatedProduct) {

                const ratingTotal = updatedProduct.reviews.reduce((x, y) => {
                    return x + parseInt(y.rating, 10)
                }, 0)
                updatedProduct.rating = ratingTotal / updatedProduct.reviews.length
                await updatedProduct.save()
                if(updatedProduct){
                    res.status(201).send({ data: updatedProduct })
                }
                else{
                    res.status(401).send("error, couldn't update product rating mean")
                }
                
            }
            else {
                res.status(401).send("error, couldn't save in db the uodated product")
            }
        }
        else {
            res.status(401).send("error, product not found")
        }
    }
    catch (err) {
        res.status(401).send({ error: err.message })
    }
})

module.exports = router