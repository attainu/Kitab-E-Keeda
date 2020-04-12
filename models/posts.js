const sequelize = require('../db');
const UUID = require('uuid/v4')
const User = require('./users')
const Comment = require('./comments')
const Likes = require('./likes')


const { Sequelize, Model } = require('sequelize');
class Post extends Model {

}
const postSchema =  {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
   
    post : {
        type : Sequelize.STRING,
        allowNull: false
    },
    user : {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: '_id'
        },
    },
    comments : [{
        type: Sequelize.INTEGER,
        references: {
            model: Comment,
            key: '_id'
        }}
    ],
    likes : [{
        type: Sequelize.INTEGER,
        references: {
            model: Likes,
            key: '_id'
        }
    }],
    likesCount : {
        type : Sequelize.INTEGER,
        defaultValue : 0
    },
    disLikesCount : {
        type : Sequilize.INTEGER,
        defaultValue : 0
    }
}

Post.init(postSchema, {
    sequelize,
    tableName: "posts"
})  
module.exports = Post