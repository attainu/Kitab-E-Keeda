const Post = require('../../models/posts')
const Comment = require('../../models/comments')
const Like = require('../../models/likes')
const Thread = require('../../models/threads')
const User = require('../../models/users')

module.exports = {
    async createPosts(req, res){
        try{
            const post = req.body.postBody
            const user = req.params.userId   
            const newPost = new Post({ post, user })
            await newPost.save()
            const foundUser  = await User.findOneAndUpdate({ _id : user }, { $push : { posts : newPost._id } })
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
            const newComment = new Comment({ comment, userId, postId })
            await newComment.save()
            const foundPost = Post.findOneAndUpdate({ _id : postId }, { $push : { comments : newComment._id }})
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
            const foundComment = await Comment.findOneAndUpdate({ _id : commentId }, { $push : { threadId : newThread._id }})
            if(!foundComment) return res.send("invalid Credentials")
            res.json(newThread)
        }catch(err){
            console.log(err)
        }
    },

    async getPosts(req, res){
        try {
            const { userId } = req.params
            const foundUser = await User.findOne({ _id : userId })
            const followingUsers = foundUser.followingUser
            setTimeout(() => {
                const userPosts = []
                followingUsers.forEach(el => {
                    Post.find({ user: el }).exec((err, resp)=>{
                        if(err) console.log(err) 
                        else if(resp == []) return res.send("followed users have no posts to show")  
                        userPosts.push(resp)
                    })
                });  
                setTimeout(()=>{
                    res.send(userPosts)
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
            const foundPost = await Post.findOneAndUpdate({ _id : postId, user : userId }, { post })
            if(!foundPost) return res.status(400).send("invalid credentials")
            res.json({msg : "post updated successfully", resp })
        }catch(err){
            console.log(err)
        }
    },

    async deletePosts(req, res){
        try{
            const { userId, postId } = req.params
            const foundPost = await Post.findOneAndDelete({ _id : postId, userId })
            if(!foundPost) return res.status(400).send("invalid credentials")
            else if(resp !== null ) res.json({msg : "post deleted successfully", resp })
            else return res.status(200).send("nothing to delete")
            Comment.deleteMany({ postId, userId }).exec((err, _)=>{
                if(err) console.log(err.message)
                console.log("comment related to post deleted")
            })
            Like.deleteMany({ postId, userId }).exec((err, _)=>{
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
            const foundComment = await Comment.findOneAndUpdate({ _id : commentId, userId }, { comment })
            if(!foundComment) return res.status(400).send("invalid credntials")
            res.json({ msg : "comment updated successfully ", resp })
        }catch(err){
            console.log(err)
        }
    },

    async deleteComments(req, res){
        try{
            const { userId, commentId } = req.params
            const foundComment = await Comment.findOneAndDelete({ _id : commentId })
            if(!foundComment) return res.send("invalid credentials")
            else if(resp !== null ) res.json({msg:"comment deleted successfully", resp})
            else return res.status(200).send("nothing to delete")
            Thread.deleteMany({ commentId, userId }).exec((err, _)=>{
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
            const foundThread = await Thread.findOneAndUpdate({ _id : threadId ,userId }, { thread})
            if(!foundThread) return res.send("invalid credentials")
            res.json({ msg: "thread updated successfully", resp })
        }catch(err){
            console.log(err)
        }
    },

    async deleteThreads(req, res){
        try{
            const { userId, threadId } = req.params
            Thread.findByIdAndDelete({ _id : threadId, userId }).exec((err, resp)=>{
                if(err) return res.send("invalid credentials")
                else if(resp !== null) return res.json({msg : "thread deleted successfully", resp})
                else return res.send("nothing to delete") 
            })
        }catch(err){
            console.log(err)
        }
    }
}