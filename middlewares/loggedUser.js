const User = require('../models/users');
const { verify } = require('jsonwebtoken')
const { privateKey } = process.env

module.exports = {
    async loggedUser(req, res, next){
        try{
            const foundUser = await User.findOne({ email : req.body.email }) 
            if(!foundUser) return res.send("invalid credentials")
            else if(!foundUser.token) next();
            else{
                const isExpired = await verify( foundUser.token, privateKey )
                console.log(isExpired)
                if(!isExpired) next()
                res.send("you've already logged in")
            }         
        }catch(err){
            if(err.message == "jwt expired") next()
            console.log(err.message)
        }
    }
}

