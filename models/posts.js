const { Schema, model } = require('mongoose')

const postSchema = Schema({
    post : {
        type : String,
        required : true,
    },
    user : [{
        type : Schema.Types.ObjectId,
        ref : 'user'
    }],
    comments : [{
        type : Schema.Types.ObjectId,
        ref : 'comments'
    }],
    likes : [{
        type : Schema.Types.ObjectId,
        ref : 'likes'
    }]
})

const postModel = model('posts', postSchema)

module.exports = postModel