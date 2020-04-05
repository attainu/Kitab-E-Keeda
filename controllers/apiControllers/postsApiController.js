const Post = require('../../models/posts')
const Comment = require('../../models/comments')
const Like = require('../../models/likes')
const User = require('../../models/users')

module.exports = {
    async createPosts(req, res){
        try{
            const postBody = req.body.postBody
            const userId = req.params.userId   
            const newPost = new Post({
                post : postBody,
                user : userId
            })
            await newPost.save()
            User.findOneAndUpdate({ _id : userId }, { $push : { posts : newPost._id } }).exec((err, resp)=>{
                if(err) console.log(err)
                console.log(resp)
            })
            res.json(newPost)    
        }catch(err){
            console.log(err)
        }
    },

    async addComment(req, res){
        try{
            const commentBody = req.body.commentBody;
            const { userId, postId } = req.params
            const newComment = new Comment({
                comment : commentBody,
                userId : userId,
                postId : postId
            })
            await newComment.save()
            Post.findOneAndUpdate({ _id : postId }, { $push : { comments : newComment._id }}).exec((err, resp)=>{
                if(err) console.log(err)
                console.log(resp)
            })
            res.send(newComment)
        }catch(err){
            console.log(err)
        }
    },

    async addLikes(req, res){
        try{
            const { userId, postId} = req.params
            const { like } = req.headers
            const newLike = new Like({
                userId : userId,
                postId : postId,
                like : like
            })
            // to add likes count in posts
            if(newLike.like === true ){
                newLike.dislike = false
                Post.findOneAndUpdate({ _id : postId }, {$inc : { likesCount : 1 }}).exec((err, resp) => {
                    if(err) console.log(err)
                    console.log(resp)
                })            
            }else{
                Post.findOneAndUpdate({ _id : postId }, {$inc : { disLikesCount : 1 }}).exec((err, resp) => {
                    newLike.dislike = true
                    if(err) console.log(err)
                    console.log(resp)
                }) 
            }
            await newLike.save()
            Post.findOneAndUpdate({ _id : postId }, { $push : { likes : newLike._id}}).exec((err, resp) => {
                if(err) console.log(err)
                console.log(resp)
            })
            res.send(newLike)
        }catch(err){
            console.log(err)
        }
    }
}