const { Sequelize, Model } = require("sequelize");
const Post = require('./posts')
const Thread = require('./threads')
const User = require('./users')
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
        type : Sequelize.STRING,
        references: {
            model: Post,
            key: '_id'
        },
        allowNull : false
    },
    userId : {
        type : Sequelize.STRING,
        references: {
            model: User,
            key: '_id'
        }
    },
    threadId : [{
        type : Sequelize.STRING,
        references: {
            model: Thread,
            key: '_id'
        }
    }]
}

Comment.init(commentSchema, {
    sequelize,
    tableName: "comments"
})  

module.exports = Comment;
