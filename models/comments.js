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
        type : Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
            model: 'posts',
            key: '_id'
        },
        allowNull : false
    },
    userId : {
        type : Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
            model: 'users',
            key: '_id'
        }
    },
}

Comment.init(commentSchema, {
    sequelize,
    tableName: "comments"
})  

module.exports = Comment;
