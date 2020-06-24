const express = require("express")
const User = require("../models/userModel")
const router = express.Router()
const Modules = require("../utils")

const {getToken, isAuth, isAdmin} = Modules

router.get("/createadmin", isAuth, isAdmin, async (req, res) => {
    try {
        const user = new User({
            name: "Manel",
            email: "manilox33@gmail.com",
            password: "tonto1234",
            isAdmin: true
        })

        const newUser = await user.save()

        res.send(newUser)

    } catch (error) {

        res.send({ error: error.message })
    }

})

//we are using react route to render login template, so just need Post requests
router.post("/login", async (req, res) => {

    try {
        const signinUser = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })

        if (signinUser) {
            console.log(signinUser, "usuario loged in correctly")
            res.status(201).send({
                _id: signinUser.id,
                email: signinUser.email,
                name: signinUser.name,
                isAdmin: signinUser.isAdmin,
                token: getToken(signinUser)
            })

        } else {
            console.log("invalid mail or password")
            res.status(401).json({ message: "invalid mail or password" })
        }
    }
    catch (err) {
        console.log(err, "err")
        res.status(401).json({ message: "server.error" })
    }
})



router.post("/register", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false
        })
        const newUser = await user.save()

        if (newUser) {

            return res.send({
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        }

        else {
            res.status(401).json({ error: "user already created" })
        }

    }
    catch (err) {
        res.json({message: err.message})
    }
})
module.exports = router