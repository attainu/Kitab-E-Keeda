const { Schema, model } =require('sequelize');

const commentSchema = Schema({
    comment : {
        type : String,
        required :true
    },
    postId : {
        type : Schema.Types.ObjectId,
        ref : 'posts',
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    threadId : [{
        type : Schema.Types.ObjectId,
        ref : 'thread'
    }]
})

const commentModel = model('comments', commentSchema)
module.exports = commentModel