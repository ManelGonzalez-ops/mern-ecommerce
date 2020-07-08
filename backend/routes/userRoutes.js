const express = require("express")
const User = require("../models/userModel")
const router = express.Router()
const Modules = require("../utils")

const { getToken, isAuth, isAdmin } = Modules

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
            console.log(req.user, "uuusuario")
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
            res.status(401).send({ message: "invalid mail or password" })
        }
    }
    catch (err) {
        console.log(err, "err")
        res.status(401).json({ data: err.message })
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
                _id: newUser.id,
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
        res.json({ message: err.message })
    }
})

router.put("/update", async (req, res) => {
    console.log("Hhhhhhhhhhhola marika")
    try {

        console.log(req.body, "boooooooooooody")
        console.log(req.body._id, "iiiiiiiiiiiiiiid")
        const user = req.body._id
        const foundUser = await User.findById(user)
        if (foundUser) {
            foundUser.address = req.body.address,
                foundUser.city = req.body.city,
                foundUser.postal = req.body.postal,
                foundUser.country = req.body.country

            const userUpdated = await foundUser.save()
            const userrr = {
                _id: userUpdated.id,
                name: userUpdated.name,
                email: userUpdated.email,
                isAdmin: userUpdated.isAdmin,
                address: userUpdated.address,
                city: userUpdated.city,
                postal: userUpdated.postal,
                country: userUpdated.country,
                token: getToken(foundUser)
            }

            if (userUpdated) {
                return res.status(201).send({ data: userrr })
            }


            else {
                res.status(401).send({ error: "can't update user shipping info" })
            }
        }
        else {
            res.status(401).send({ error: "user not found" })
        }

    }
    catch (err) {
        res.status(401).send({ error: err.message })
    }
})




router.put("/updateAccount", async (req, res)=>{

    try{
        const user = await User.findById(req.body.id)

        if(user){

            user.name = req.body.name
            user.email = req.body.email
            user.password = req.body.password

            const userUpdated = await user.save()

            if(userUpdated){

                res.status(201).send({data: userUpdated})
            }
            else{
                res.status(201).send({data: "user was found but couldn't be updated"})

            }
            
        }
        else{
            res.status(401).send({data: "user not foundddd"})
        }
    }
    catch(err){
        res.status(401).send({data: err.message})
    }

      
})


module.exports = router