const { Sequelize, Model } = require('sequelize');
const sequelize = require('../db');
class FavAuthor extends Model {}

const favAuthorSchema = {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
   
    author : {
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
    }
}

FavAuthor.init(favAuthorSchema, {
    sequelize,
    tableName : "favAuthors"
})
module.exports = FavAuthor