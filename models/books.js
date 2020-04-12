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
    volumeInfo : { type: Sequelize.STRING  },
    saleInfo : { type : Sequelize.STRING  },
    accessInfo : { type :Sequelize.STRING },
    reviews : [{ 
        type : Sequelize.STRING,
        references: {
            model: Review,
            key: '_id'
        }
    }],
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
