const { Schema, model } = require('mongoose')

const booksSchema = new Schema({
    genre : {
        type: Array,
        required : true,
        default: 'computer'
    },
    favAuthors : {
        type: Array,
        required: false,
    },
    booksRead : {
        type : Array,
        required : false
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
})

const booksModel = model('bookP', booksSchema)

module.exports = booksModel
