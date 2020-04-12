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
    kind: { type: Sequelize.STRING  },
    id : { type : Sequelize.STRING },
    etag : { type : Sequelize.STRING },
    selfLink : { type : Sequelize.STRING },
    volumeInfo : { type: Sequelize.OBJECT },
    saleInfo : { type : Object },
    accessInfo : { type : Object },
    reviews : [{ 
        type : Schema.Types.ObjectId,
        ref : 'reviews'
    }],
    ratingCount : {
        type : Number,
        default : 0,
        required : false
    },
    ratingAvg : {
        type : Number,
        required : false
    }

}


Book.init(booksSchema, {
    sequelize,
    tableName: "books"
})  

module.exports = Book
