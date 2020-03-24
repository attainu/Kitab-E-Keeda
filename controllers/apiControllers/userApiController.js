const User = require('../../models/users')
module.exports = {
    async registerUser(req, res){
        console.log("inside post register")
        try{
            res.json(req.body)
            const user = new User({ ...req.body })
            await user.save()   
        }catch(err){
            console.log(err);
            res.send(err)
        }
    },

    async loginUser(req, res){
        const{ email, password } = req.body
        try{
            const foundUser = await User.findByEmailAndPassword(email, password);
            return res.json({
                "message":"login successfully",
                "user" : foundUser
            })
        }catch(err){
            console.log(err.message)
            return res.send(err.message)
        }
    } 
}