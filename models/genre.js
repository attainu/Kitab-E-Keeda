const {
    Schema,
    model
} = require('mongoose')

const genreSchema = new Schema({
    genre: {
        type: Array,
        required: true,
        default: 'computer'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

const genreModel = model('genre', genreSchema)

module.exports = genreModel