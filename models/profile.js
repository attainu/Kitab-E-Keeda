const { Schema, model } = require('mongoose')

const profileSchema = new Schema({
    
    uploadImage : {
        type : String,
        required : true,   
    },
    DOB : {
        type : Date,
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