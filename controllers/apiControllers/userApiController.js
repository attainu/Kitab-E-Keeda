const User = require('../../models/users')
module.exports = {
    registerUser: async (req, res) => {
        console.log("inside post register")
        try{
            res.json(req.body)
            const user = new User({ ...req.body })
            await user.save()   
        }catch(err){
            console.log(err)
        }
    },

    loginUser: async (req, res) =>{
        const{ email, password } = req.body
        try{
            const foundUser = await User.findByEmailAndPassword(email, password);
            res.json({
                "message":"login successfully",
                "user" : foundUser
            })
        }catch(err){
            console.log(err)
        }
    } 
}