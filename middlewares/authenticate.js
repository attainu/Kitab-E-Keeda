const User = require('.././models/users');
const { verify } = require('jsonwebtoken')
const { privateKey } = process.env

module.exports = {
    async authenticate(req, res, next){
        try{
            const foundUser = await User.findOne({ email : req.body.email }) 
            if(!foundUser) return res.send("invalid credentials")
            else if(!foundUser.token) next();
            else{
                const isExpired = verify( foundUser.token, privateKey)
                if(!isExpired) next()
                res.send("you've already logged in")
            }         
        }catch(err){
            console.log(err)
        }
    }
}

