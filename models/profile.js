const {
    Schema,
    model
} = require('mongoose')

const profileSchema = new Schema({

    uploadImage: {
        type: String,
        required: false,
        default : 'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png'
    },
    DOB: {
        type: String ,
        required : true, 
       
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        default: 'male'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

const profileModel = model('profile', profileSchema)
module.exports = profileModel