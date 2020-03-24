const { Schema, model } = require('mongoose');
const { compare, hash } = require('bcrypt')
const userSchema = new Schema({
    name : {
        type: String,
        required : true,
        trim : true
    },
    email : {
        unique : true,
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    token : {
        type : String,
        trim: true
    }
})

    userSchema.statics.findByEmailAndPassword = async (email, password)=>{
        try{
            const user = await User.findOne({ email })
            if(!user) throw new Error('invalid credentials')
            const isMatched = await compare(password, user.password)
            if(!isMatched) throw new Error("incorrect credentials")
            return user;
        }catch(err){
            throw err;
        }
    }
    
userSchema.pre('save', async function(next){
    try{
        const user = this
        const hashedPassword = await hash(user.password, 10)
        user.password = hashedPassword 
        next();   
    }catch(err){
        next(err);
    }
})

const User = model('user', userSchema);
module.exports = User
