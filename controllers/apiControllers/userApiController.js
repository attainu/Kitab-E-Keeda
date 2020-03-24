const User = require('../../models/users');
const { sign } = require('jsonwebtoken');
const privateKey = "AmitPallauri"
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
            sign({id : uuid} , privateKey, { expiresIn : 60*60*1 }, (err, token) => {
                if(err) return res.send(err.message);
                foundUser.token = token
                return res.json({
                   "message": "login successfull",
                    "user": foundUser
                })
            })
        } catch (err) {
            console.log(err.message)
            return res.send(err.message)
        }
    }
}