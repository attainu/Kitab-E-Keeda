const { Schema, model } = require('mongoose')
const likesSchema = Schema({
    like : {
        type : Boolean,
        required: true
    },
    // dislike : {
    //     type : Boolean,
    //     required: true
    // },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    postId : {
        type : Schema.Types.ObjectId,
        ref : 'posts'
    }
})

const likeModel = model('likes', likesSchema)
module.exports = likeModel