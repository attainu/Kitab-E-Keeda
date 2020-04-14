const { Sequelize, Model } = require('sequelize');
const sequelize = require('../db');
class Book extends Model {

}
const booksSchema = {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
    title : { type: Sequelize.STRING  },
    authors : { type : Sequelize.STRING },
    publisher : { type : Sequelize.STRING },
    publishdate : { type : Sequelize.STRING },
    description : { type: Sequelize.STRING },
    pageCount : { type : Sequelize.INTEGER },
    categories : { type :Sequelize.ARRAY(Sequelize.STRING)},
    // reviews : { 
    //     type : Sequelize.ARRAY(Sequelize.UUID),
        
    //     allowNull: true,
        
    // },
    ratingCount : {
        type : Sequelize.INTEGER,
        defaultValue : 0,
        allowNull : true
    },
    ratingAvg : {
        type : Sequelize.INTEGER,
        allowNull : true
    }

}


Book.init(booksSchema, {
    sequelize,
    tableName: "books"
})  

module.exports = Book
