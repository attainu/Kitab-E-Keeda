const { Schema, model } = require('mongoose')

const profileSchema = new Schema({
    
    uploadImage : {
        type : String,
        required : false,   
    },
    DOB : {
        type : Number,
        required : true,
        default : new Date()
    },
    address : {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true,
        default : 'male'
    },
    user : {
        type : Schema.Types.ObjectId,
        ref: 'user'
    } 
})

const profileModel = model('profile', profileSchema)
module.exports = profileModel