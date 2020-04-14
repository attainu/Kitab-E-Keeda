const { Sequelize, Model } = require('sequelize');
const sequelize = require('../db');
class Genre extends Model {}
const genreSchema = {
    _id : {
        type : Sequelize.UUID,
        defaultValue : "Computers",
        primaryKey : true,
        allowNull : false
    },
    genre : {
        type : Sequelize.STRING,
        allowNull: false
    },
    user : {
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