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
    description : { type: Sequelize.TEXT },
    pageCount : { type : Sequelize.INTEGER },
    categories : { type :Sequelize.STRING},
   
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
