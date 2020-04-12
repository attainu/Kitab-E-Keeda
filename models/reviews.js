const sequelize = require('../db');
const User = require('./users')
const Books = require('./books')
const { Sequelize, Model } = require("sequelize");
class Review extends Model {

}

const reviewsSchema = {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
    rating :  {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    review : {
        type : Sequelize.STRING,
        allowNull: false
    },
    userId : {
        type : Sequelize.STRING,
        references: {
            model: User,
            key: '_id'
        }
    },
    bookId : {
        type : Sequelize.STRING,
        references: {
            model: Books,
            key: '_id'
        }
    }
}

Review.init(reviewsSchema, {
    sequelize,
    tableName: "reviews"
})  

module.exports = User;