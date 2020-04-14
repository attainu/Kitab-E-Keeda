const { Sequelize, Model } = require('sequelize');
const sequelize = require('../db');
class BooksRead extends Model {}

const BooksReadSchema = {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
    title : {
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

BooksRead.init(BooksReadSchema, {
    sequelize,
    tableName : "booksRead"
})
module.exports = BooksRead