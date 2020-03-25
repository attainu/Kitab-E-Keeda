const User = require('../../models/users');
const { sign } = require('jsonwebtoken');
const { privateKey } = process.env
const uuid = require('uuid/v4')

module.exports = {
    async registerUser(req, res) {
        console.log("inside post register")
        try {
            res.json(req.body)
            const user = new User({...req.body})
            await user.save()
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    },

    async loginUser(req, res) {
        const { email, password } = req.body
        try {
            const foundUser = await User.findByEmailAndPassword(email, password);
            sign({id : uuid} , privateKey, { expiresIn : 60*60*60*2 }, (err, token) => {
                if(err) return res.send(err.message);
                foundUser.token = token 
                foundUser.save() 
                return res.json({
                   "message": "login successfull",
                    "user": foundUser
                })
            })
        } catch (err) {
            console.log(err.message)
            return res.send(err.message)
        }
    },

    async logoutUser(req, res){
        const token = req.headers.authentication
        try{
            const foundUser = await User.findOneAndUpdate({ token },{$unset : {token}})
            if(!foundUser) return res.send("invalid credentials")
            return res.json({
                "message" : "logged out successfully"
            });        
        }catch(err){
            console.log(err)
        }
    }
}