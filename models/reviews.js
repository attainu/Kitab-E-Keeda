const sequelize = require('../db');
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
        type : Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
            model: 'users',
            key: '_id'
        }
    },
    bookId : {
        type : Sequelize.UUID,
        foreignKey: true,
        allowNull: false,
        references: {
            model: 'books',
            key: '_id'
        }
    }
}

Review.init(reviewsSchema, {
    sequelize,
    tableName: "reviews"
})  

module.exports = Review;