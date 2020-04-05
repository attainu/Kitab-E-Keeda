const { Schema, model } = require('mongoose')

const postSchema = Schema({
    post : {
        type : String,
        required : true,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    comments : [{
        type : Schema.Types.ObjectId,
        ref : 'comments'
    }],
    likes : [{
        type : Schema.Types.ObjectId,
        ref : 'likes'
    }],
    likesCount : {
        type : Number,
        default : 0
    },
    disLikesCount : {
        type : Number,
        default : 0
    }
})

const postModel = model('posts', postSchema)
module.exports = postModel