const Profile = require('../models/profile')

module.exports = {
    async updateProfile(req, res, next){
        try{ 
            const user = req.params.userId
            const foundUser = await Profile.findOne({where:{_id: user }})
            if(foundUser) return res.send("profile has already been set for this user")
            
            

            else next()
        }catch(err){
            console.log(err)
        }
    }
}
    
