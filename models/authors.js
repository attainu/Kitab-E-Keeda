const {
    Schema,
    model
} = require('mongoose')

const authorSchema = new Schema({

    favAuthors: {
        type: Array,
        required: false,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

const authorModel = model('author', authorSchema)

module.exports = authorModel