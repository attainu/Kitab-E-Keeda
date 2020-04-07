const User = require('../models/users')
const { verify } = require('jsonwebtoken')
const { privateKey } = process.env

module.exports  = {
    async authenticate(req, res, next){
        try{
            const userId = req.params.userId
            if(!userId) return res.send("invalid credentials")
            const foundUser = await User.findOne({ _id : userId })
            if(!foundUser) return res.send("invalid credentials")
            else if(!foundUser.token) return res.send("login required")
            else{
                const isExpired = verify( foundUser.token, privateKey )
                if(!isExpired) return res.send("login Expired")
                next()
            }
        }catch(err){
            console.log(err)
        }
    }
}