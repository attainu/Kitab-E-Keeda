const User = require('../models/users')
const { verify } = require('jsonwebtoken')
const { PrivateKey } = process.env

module.exports  = {
    async authenticate(req, res, next){
        try{
            const { userId }= req.params
            const foundUser = await User.findOne({where:{ _id : userId }})
            if(!foundUser) return res.send("invalid credentials")
            else if(foundUser.token == null ) return res.send("login required")
            else if(foundUser.verified == false) return res.send("email is not verified")
            else{
                const isExpired = verify( foundUser.token, PrivateKey )
                if(!isExpired) return res.send("login Expired")
                next()
            }   
            
        }catch(err){
            console.log(err)
            res.send(err.message)
        }
    }
  
}