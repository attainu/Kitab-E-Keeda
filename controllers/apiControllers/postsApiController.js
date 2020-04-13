const Post = require('../../models/posts')
const Comment = require('../../models/comments')
const Like = require('../../models/likes')
const Thread = require('../../models/threads')
const User = require('../../models/users')

module.exports = {
    async createPosts(req, res){
        try{
            const post = req.body.post
            const user = req.params.userId   
            const newPost = await  Post.create({ post, user })
            
            const foundUser  = await User.update( { $push : { posts : newPost._id } },{where:{ _id : user }})
            if(!foundUser) return res.status(400).send("invalid credentials")
            res.json(newPost)    
        }catch(err){
            console.log(err)
        }
    },

    async addComment(req, res){
        try{
            const comment = req.body.commentBody;
            const { userId, postId } = req.params
            const newComment =  await Comment.create({ comment, userId, postId })
            
            const foundPost = await Post.update( { $push : { comments : newComment._id }},{where:{ _id : postId }})
            console.log(foundPost)
            if(!foundPost) return res.status(400).send("invalid credentials")
            res.send(newComment)
        }catch(err){
            console.log(err)
        }
    },

    async addLikes(req, res){
        try{
            const { userId, postId } = req.params
            const { like } = req.headers
            const newLike =  Like.build({ userId, postId, like })
            // to add likes count in posts
            if(newLike.like === true ){
                newLike.dislike = false
                Post.update( {$inc : { likesCount : 1 }},{where:{ _id : postId }}).exec((err, resp) => {
                    if(err) console.log(err)
                    console.log(resp)
                })            
            }else{
                Post.update( {$inc : { disLikesCount : 1 }},{where:{ _id : postId }}).exec((err, resp) => {
                    newLike.dislike = true
                    if(err) console.log(err)
                    console.log(resp)
                }) 
            }
            await newLike.save()
            Post.update( { $push : { likes : newLike._id}},{where:{ _id : postId }}).exec((err, resp) => {
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
            const newThread = await Thread.create({ userId, commentId, thread })
            
            const foundComment = await Comment.update( { $push : { threadId : newThread._id }},{where:{ _id : commentId }})
            if(!foundComment) return res.send("invalid Credentials")
            res.json(newThread)
        }catch(err){
            console.log(err)
        }
    },

    async getPosts(req, res){
        try {
            const { userId } = req.params
            const foundUser = await User.find({where:{ _id : userId }})
            const followingUsers = foundUser.followingUser
            setTimeout(() => {
                const userPosts = []
                followingUsers.forEach(el => {
                     Post.find({where:{ user: el }}).then(doc =>{
                         if(!doc) console.log(err)
                         else userPosts.push(doc)                     
                        }).catch(err => console.log(err))
                });
                    setTimeout(()=>{
                        res.json(userPosts)
                    }, 2000)          
            }, 3000);
        } catch (err) {
            console.log(err)
        }
    },

    async updatePosts(req, res){
        try{
            const { userId, postId } = req.params
            const { post } = req.headers
            const foundPost = await Post.update( { post:post },{where:{ _id : postId, user : userId }})
            if(!foundPost) return res.status(400).send("invalid credentials")
            res.json({msg : "post updated successfully", foundPost })
        }catch(err){
            console.log(err)
        }
    },

    async deletePosts(req, res){
        try{
            const { userId, postId } = req.params
            const foundPost = await Post.destroy({ _id : postId, user : userId })
            if(!foundPost) return res.status(400).send("invalid credentials")
            else if(foundPost !== null ) res.json({msg : "post deleted successfully", foundPost })
            else return res.status(200).send("nothing to delete")
            Comment.destroy({ postId: postId, userId: userId }).exec((err, _)=>{
                if(err) console.log(err.message)
                console.log("comment related to post deleted")
            })
            Like.destroy({ postId: postId, userId: userId }).exec((err, _)=>{
                if(err) console.log(err.message)
                console.log("likes related to the post has been deleted")
            })
        }catch(err){
            console.log(err)
        }
    },

    async updateComments(req, res){
        try{
            const { userId, commentId } = req.params
            const { comment } = req.headers
            const foundComment = await Comment.update( { comment:comment },{where:{ _id : commentId,userId: userId }})
            if(!foundComment) return res.status(400).send("invalid credntials")
            res.json({ msg : "comment updated successfully ", foundComment })
        }catch(err){
            console.log(err)
        }
    },

    async deleteComments(req, res){
        try{
            const { userId, commentId } = req.params
            const foundComment = await Comment.destroy({ _id : commentId })
            if(!foundComment) return res.send("invalid credentials")
            else if(foundComment !== null ) res.json({msg:"comment deleted successfully", foundComment})
            else return res.status(200).send("nothing to delete")
            Thread.destroy({ commentId:commentId, userId: userId }).exec((err, _)=>{
                if(err) console.log(err)
                console.log("threads under the comment deleted successfully")
            })
        }catch(err){
            console.log(err)
        }
    },

    async updateThreads(req, res){
        try{
            const { userId, threadId } = req.params
            const { thread } = req.headers
            const foundThread = await Thread.update( { thread :thread},{where:{ _id : threadId ,userId :userId}})
            if(!foundThread) return res.send("invalid credentials")
            res.json({ msg: "thread updated successfully", foundThread })
        }catch(err){
            console.log(err)
        }
    },

    async deleteThreads(req, res){
        try{
            const { userId, threadId } = req.params
            Thread.destroy({ _id : threadId, userId : userId }).exec((err, resp)=>{
                if(err) return res.send("invalid credentials")
                else if(resp !== null) return res.json({msg : "thread deleted successfully", resp})
                else return res.send("nothing to delete") 
            })
        }catch(err){
            console.log(err)
        }
    },

    async searchPost(req, res){
        try {
            const { postId }  = req.params
            const foundPost = await Post.find({ _id : postId })
            if(!foundPost) return res.send("invalid credentials")
            console.log(foundPost)
            res.json(foundPost)
        } catch (error) {
            console.log(error)
        }
    }
}