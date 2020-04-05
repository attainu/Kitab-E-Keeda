const { Schema, model } = require('mongoose')

const reviewsSchema = new Schema({
    rating :  {
        type: Number,
        required: true
    },
    review : {
        type : String,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    bookId : {
        type : Schema.Types.ObjectId,
        ref : 'books'
    }
})

const reviewModel = model('reviews', reviewsSchema)
module.exports = reviewModel