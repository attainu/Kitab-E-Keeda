
const sequelize = require('../db');
const User = require('./users')
const Comment = require('./comments')
const { Sequelize, Model } = require("sequelize");
class Thread extends Model {

}
const threadSchema = {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
    thread : {
        type : String,
        required : true,
    },
    userId : {
        type : Sequelize.STRING,
        references: {
            model: User,
            key: '_id'
        }
    },
    commentId : {
        type : Sequelize.STRING,
        references: {
            model: Comment,
            key: '_id'
        }
    }
}

Thread.init(threadSchema, {
    sequelize,
    tableName: "thread"
})  

module.exports = Thread;