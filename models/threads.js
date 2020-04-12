const { Schema, model } = require('sequelize');
const threadSchema = Schema({
    thread : {
        type : String,
        required : true,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    commentId : {
        type : Schema.Types.ObjectId,
        ref :'comments'
    }
})
module.exports = model('thread', threadSchema)