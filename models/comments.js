const { Sequelize, Model } = require("sequelize");

const sequelize = require('../db');
class Comment extends Model {

}
const commentSchema = {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
    comment : {
        type : Sequelize.STRING,
        allowNull : false
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
}

Comment.init(commentSchema, {
    sequelize,
    tableName: "comments"
})  

module.exports = Comment;
