const User = require('../models/users')
const { verify } = require('jsonwebtoken')
const { PrivateKey } = process.env

module.exports = {
    async followedUser(req, res, next){
        try{
            const follower = req.params.follower
            const following = req.params.following    
            const followerUser = await User.findOne({where:{ _id: follower }})
            const followingUser = await User.findOne({where:{ _id : following }})
            if(!followerUser || !followingUser ) return res.send("invalid credentials")
            else if( !followerUser.token ) return res.send("login needed")
            else{
                const isExpired = verify( followerUser.token, PrivateKey )
                if(!isExpired) return res.send("token expired")
                //verifying if the follower has already followed the user
                const testUsers = followerUser.followingUser
                if(testUsers == null) next()
                console.log(testUsers)
                // testUsers.find( el => {
                //     if(following == el) return res.send("already following")
                //     else next()
                // })
            } 
        
        }catch(err){
            console.log(err)
        }
    }
}