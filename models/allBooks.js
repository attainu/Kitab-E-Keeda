const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    reviews : [{ 
        type : Schema.Types.ObjectId,
        ref : "reviews"
    }],
     ratingCount : {
        type : Number,
        default : 0,
        required : false
    },
    ratingAvg : {
        type : Number,
        required : false
    }

    // kind: { type: String },
    // id : { type : String },
    // etag : { type : String },
    // selfLink : { type : String },
    // volumeInfo : { type: Object },
    // saleInfo : { type : Object },
    // accessInfo : { type : Object }
  
})
   
var  allbooks = model("allbook", userSchema);
module.exports = allbooks;


