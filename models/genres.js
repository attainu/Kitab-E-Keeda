const { Sequelize, Model } = require('sequelize');
const sequelize = require('../db');
class Genre extends Model {}
const genreSchema = {
    _id : {
        type : Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey : true,
        allowNull : false
    },
    genre : {
        type : Sequelize.STRING,
        allowNull: false
    },
    userId : {
        type: Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
        references: { 
            model: 'users',
            key: '_id'
        },
    },
}

Genre.init(genreSchema, {
    sequelize,
    tableName: "genres"
})  
module.exports = Genre