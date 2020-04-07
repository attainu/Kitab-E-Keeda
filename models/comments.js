const { Schema, model } = require('mongoose')

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
    }
})

const commentModel = model('comments', commentSchema)
module.exports = commentModel