const { Sequelize, Model } = require('sequelize');
const sequelize = require('../db');
class following extends Model {}


const followingSchema = {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
    followingUser : {
        type: Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
            model: 'users',
            key: '_id'
        },
    }
}

following.init(followingSchema, {
    sequelize,
    tableName : "followingUser"
})
module.exports = following