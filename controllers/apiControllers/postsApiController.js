const Post = require('../../models/posts')
const Comment = require('../../models/comments')
const Like = require('../../models/likes')
const Thread = require('../../models/threads')

module.exports = {
    async createPosts(req, res){
        try{
            const post = req.body.postBody
            const user = req.params.userId   
            const newPost = await Post.create({ post, user })
            res.json(newPost)    
        }catch(err){
            console.log(err)
        }
    },

    async searchPost(req, res){
        try {
            const { postId }  = req.params
            const foundPost = await Post.find({ _id : postId })
            if(!foundPost) return res.send("invalid credentials")
            res.json(foundPost)
        } catch (error) {
            console.log(error)
        }
    },

    async updatePosts(req, res){
        try{
            const { userId, postId } = req.params
            const { post } = req.headers
            const foundPost = await Post.update( { post },{ where: { _id : postId, user : userId }})
            if(!foundPost) return res.status(400).send("invalid credentials")
            res.json({ msg : "post updated successfully", foundPost })
        }catch(err){
            console.log(err)
        }
    },

    async deletePosts(req, res){
        try{
            const { userId, postId } = req.params
            const foundPost = await Post.destroy({ where : { _id : postId, user : userId }})
            if(!foundPost) return res.status(400).send("invalid credentials")

            Comment.destroy({ postId, userId }).exec((err, _)=>{
                if(err) console.log(err.message)
                console.log("comment related to post deleted")
            })
            Like.destroy({ postId, userId }).exec((err, _)=>{
                if(err) console.log(err.message)
                console.log("likes related to the post has been deleted")
            })
            res.json({msg : "post deleted successfully", foundPost })
        }catch(err){
            console.log(err)
        }
    },

    async addComment(req, res){
        try{
            const comment = req.body.commentBody;
            const { userId, postId } = req.params
            const foundPost = await Post.findOne({ where:{ _id : postId }})
            if(!foundPost) return res.send("invalid credentials")
            const newComment = await Comment.create({ comment, userId, postId })
            res.send(newComment)
        }catch(err){
            console.log(err)
        }
    },

    async updateComments(req, res){
        try{
            const { userId, commentId } = req.params
            const { comment } = req.headers
            const foundComment = await Comment.update( { comment },{ where: { _id : commentId, userId }})
            if(!foundComment) return res.status(400).send("invalid credntials")
            res.json({ msg : "comment updated successfully ", foundComment })
        }catch(err){
            console.log(err)
        }
    },

    async deleteComments(req, res){
        try{
            const { userId, commentId } = req.params
            const foundComment = await Comment.destroy({ where : { _id : commentId }})
            if(!foundComment) return res.send("invalid credentials")
            Thread.destroy({ where : { commentId, userId }}).exec((err, _)=>{
                if(err) console.log(err)
                console.log("threads under the comment deleted successfully")
            })
            res.json({ msg:"comment deleted successfully", foundComment})
        }catch(err){
            console.log(err)
        }
    },

    async addLikes(req, res){
        try{
            const { userId, postId } = req.params
            const { like } = req.headers
            const newLike = await Like.create({ userId, postId, like })
            res.send(newLike)
        }catch(err){
            console.log(err)
        }
    },

    async addThreads(req, res){
        try{
            const { userId, commentId } = req.params
            const thread  = req.body.threadBody
            const foundComment = await Comment.findOne({where: { _id : commentId }})
            if(!foundComment) return res.send("invalid Credentials")
            const newThread = await Thread.create({ userId, commentId, thread })
            res.json({msg: "new thread added", newThread})
        }catch(err){
            console.log(err)
        }
    },

    async updateThreads(req, res){
        try{
            const { userId, threadId } = req.params
            const { thread } = req.headers
            const foundThread = await Thread.update( {thread},{where:{ _id : threadId , userId}})
            if(!foundThread) return res.send("invalid credentials")
            res.json({ msg: "thread updated successfully", foundThread })
        }catch(err){
            console.log(err)
        }
    },

    async deleteThreads(req, res){
        try{
            const { userId, threadId } = req.params
            Thread.destroy({ where: { _id : threadId, userId }}).exec((err, resp)=>{
                if(err) return res.send("invalid credentials")
                return res.json({msg : "thread deleted successfully", resp})
            })
        }catch(err){
            console.log(err)
        }
    },

    async getPosts(_, res){
        try {
            const foundPosts = Post.findAll({where : {}})
            if(!foundPosts) return res.send("no posts found")
            res.send(foundPosts)
        } catch (err) {
            console.log(err)
        }
    },  
}