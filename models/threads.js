
const sequelize = require('../db');
const User = require('./users')
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
        type : Sequelize.STRING,
        allowNull : true
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
    commentId : {
        type : Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
            model: 'comments',
            key: '_id'
        }
    }
}

Thread.init(threadSchema, {
    sequelize,
    tableName: "thread"
})  

module.exports = Thread;