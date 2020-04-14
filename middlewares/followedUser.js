const User = require('../models/users')
const FollowingUser = require('../models/followingUser')
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
                else{
                    //check whether inside the following model the followert and follwing ids are in same instance or not
                    const foundData = await FollowingUser.findOne({where : { followerUser }})
                    if(!founhdData) next()
                    else if(foundData.followingUser == followingUser) return res.send("you are already following")
                }
            } 
            next()
        }catch(err){
            console.log(err)
        }
    }
}