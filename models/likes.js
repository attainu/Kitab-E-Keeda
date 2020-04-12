const sequelize = require('../db');

const { Sequelize, Model} = require("sequelize");
class Like extends Model {

}

const likesSchema = Schema({
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
    like: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    // dislike : {
    //     type : Boolean,
    //     required: true
    // },
    userId: {
        type: Sequelize.STRING,
        references: {
            model: User,
            key: '_id'
        }
    },
    postId: {
        type: Sequelize.STRING,
        references: {
            model: Post,
            key: '_id'
        }
    }
})
Like.init(likesSchema, {
    sequelize,
    tableName: "likes"
})

module.exports = Like