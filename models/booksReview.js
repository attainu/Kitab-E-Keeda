const {
    Schema,
    model
} = require('mongoose')

const reviewSchema = new Schema({

    book_id: {
        type: String,
        required: false 
    },
    review: [{
         user : String,
         review : String,
         rating : String,
    }]

})

const reviewModel = model('review', reviewSchema)

module.exports = reviewModel