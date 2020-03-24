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
    }
})

userSchema.statics.findByEmailAndPassword = async (email, password)=>{
    try{
        const user = await User.findOne({ email })
        if(!user) return res.status(400).send('invalid credentials')
        const isMatched = await compare(password, user.password)
        if(!isMatched) return res.status(400).send("wrong password")
        return user;
    }catch(err){
        console.log(err)
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

const userModel = model('user', userSchema);
module.exports = userModel
