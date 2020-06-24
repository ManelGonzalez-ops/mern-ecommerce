const jwt = require("jsonwebtoken")
const config = require("./config")

const getToken =(user)=>{
    return jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin

    }, config.JWT_SECRET,{
        expiresIn: "48h"
    })
}


//when we define that function without using them, the server return a empty object dont know why xd
const isAuth =(req,res,next)=>{
    token = req.headers["authorization"]
    console.log(token, "lololololololololololololo")
    if(token){
        console.log(token, "mamamamamalalalalalalla")
        const onlyToken = token.slice(7, token.length)
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode)=>{
            if(err){
               return res.status(401).send({message: "token not valid"})
            }
            req.user = decode
            next()
            return
        })
        
    }
    else{
        return res.status(401).redirect("/users/login")
    }
   
}

const isAdmin = (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        return next()
    }
    return res.status(401).send({message: "Admin Token is not valid"})
}


module.exports = {getToken, isAuth, isAdmin}