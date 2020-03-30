const {
    Schema,
    model
} = require('mongoose')

const booksSchema = new Schema({

    booksRead: {
        type: Array,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

const booksModel = model('title', booksSchema)

module.exports = booksModel