const  {model ,Schema} = require('mongoose')

const OrderSchema = new Schema({
     amount: { 
            type:Integer,
            required : true     
         },
     currency: {
           type:Integer,
           required : true 
     } 
     


})