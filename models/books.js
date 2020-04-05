const { Schema, model } = require('mongoose')

const booksSchema = new Schema({
    kind: { type: String },
    id : { type : String },
    etag : { type : String },
    selfLink : { type : String },
    volumeInfo : { type: Object },
    saleInfo : { type : Object },
    accessInfo : { type : Object },
    reviews : [{ 
        type : Schema.Types.ObjectId,
        ref : 'reviews'
    }]
})

const booksModel = model('books', booksSchema)

module.exports = booksModel
