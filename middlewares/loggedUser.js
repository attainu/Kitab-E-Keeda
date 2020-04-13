const User = require('../models/users');
const { verify } = require('jsonwebtoken')
const { PrivateKey } = process.env

module.exports = {
    async loggedUser(req, res, next){
        try{
            const foundUser = await User.findOne({where: { email : req.body.email }}) 
            if(!foundUser) return res.send("invalid credentials")
            else if(foundUser.verified == false ) return res.send("verify your email first") 
            else if(!foundUser.token) next();
            else{
                const isExpired = await verify( foundUser.token, PrivateKey )
                if(!isExpired) next()
                res.send("you've already logged in")
            }  
                  
        }catch(err){
            if(err.message == "jwt expired") next()
            console.log(err.message)
        }
    }
}

