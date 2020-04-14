const sequelize = require('../db');
const { Sequelize, Model } = require("sequelize");
class Like extends Model {

}

const likesSchema = {
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
    //     type : Sequelize.BOOLEAN,
    //     allowNull: false
    // },
    userId: {
        type: Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
            model: 'users',
            key: '_id'
        }
    },
    postId: {
        type: Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
            model: 'posts',
            key: '_id'
        }
    }
}
Like.init(likesSchema, {
    sequelize,
    tableName: "likes"
})

module.exports = Like