const Post = require('../../models/posts')
const Comment = require('../../models/comments')
const Like = require('../../models/likes')
const Thread = require('../../models/threads')
const User = require('../../models/users')

module.exports = {
    async createPosts(req, res){
        try{
            const post = req.body.postBody
            const userId = req.params.userId   
            const newPost = new Post({ post, user })
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
            const comment = req.body.commentBody;
            const { userId, postId } = req.params
            const newComment = new Comment({ comment, userId, postId })
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
            const newLike = new Like({ userId, postId, like })
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
    },

    async addThreads(req, res){
        try{
            const { userId, commentId } = req.params
            const thread  = req.body.threadBody
            const newThread = new Thread({ userId, commentId, thread })
            await newThread.save()
            Comment.findOneAndUpdate({ _id : commentId }, { $push : { threadId : newThread._id }}).exec((err, resp)=>{
                if(err) console.log(err)
                console.log(resp)
            })
            res.json(newThread)
        }catch(err){
            console.log(err)
        }
    }
}