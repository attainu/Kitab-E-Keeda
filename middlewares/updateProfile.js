const Profile = require('../models/profile')

module.exports = {
    async updateProfile(req, res, next){
        try{
            const user = req.params.userId
            const foundUser = await Profile.findOne({ user })
            if(foundUser) return res.send("profile  has been updated for this user")
            else next()
        }catch(err){
            console.log(err)
        }
    }
}
    
