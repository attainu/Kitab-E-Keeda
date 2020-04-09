const User = require('../../models/users');
const Profile = require('../../models/profile')
const { sign } = require('jsonwebtoken');
const uuid = require('uuid/v4')
const { privateKey }= process.env
const cloudinary = require('../../fileUpload/cloudinary/cloudinary')
const bufferToString = require('../../fileUpload/bufferToString/bufferToString')

const nodemailer = require('nodemailer')

module.exports = {
    async registerUser(req, res) {
        try {
            const user = new User({...req.body})
            //random otp creating and sending
            var otp = {};
            var userOtp = Math.floor(Math.random() * 10000000000) + "";
            userOtp = userOtp.slice(0, 5);
            otp.userOtp = userOtp

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, 
                auth: {
                    user: 'rmanas000@gmail.com', 
                    pass: '12jk1a0348' 
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            var receiverEmail = req.body.email;

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Kitab-e-Keeda OFFICIAL TEAM" <rmanas000@gmail.com>',
                to: receiverEmail,
                bcc: 'mrmanasranjan547@gmail.com',
                subject: 'Node Contact Request',
                text: `Your kitab-E-keeda Verification Code is   ${otp.userOtp} `,
                html: `<b> Welcome to Kitab-e-keeda.Thanks For Registering With Us Mr. ${user.name}. Your Kitab-e-keeda verification code is :-  ${otp.userOtp} </b>`
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) return console.log(error);
                console.log('Message sent: %s', info.messageId);
            });
            await user.save()
            res.json(user)
            
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    },

    async loginUser(req, res) {
        const { email, password } = req.body
        try {
            const foundUser = await User.findByEmailAndPassword(email, password);
            sign({id : uuid} , privateKey, { expiresIn : 60*60*1 }, (err, token) => {
                if(err) return res.send(err.message);
                foundUser.token = token 
                foundUser.save() 
                return res.json({
                   "message": "login successfull",
                    "user": foundUser
                })
            })
        } catch (err) {
            console.log(err.message)
            return res.send(err.message)
        }
    },

    async logoutUser(req, res){
        const token = req.headers.authentication
        try{
            const foundUser = await User.findOneAndUpdate({ token },{$unset : {token}})
            if(!foundUser) return res.send("invalid credentials")
            return res.json({
                "message" : "logged out successfully"
            });        
        }catch(err){
            console.log(err)
        }
    },

    async addProfile(req, res){
        //upload files in cloudinary
        try{
            const { originalname, buffer } = req.file
            const imageContent = bufferToString( originalname, buffer)
            const { secure_url } = await cloudinary.uploader.upload(imageContent)
            const { DOB, address, gender } = req.body
            const user = req.params.userId
            const userprofile = new Profile({ uploadImage : secure_url, DOB, address, gender, user })
            await userprofile.save()  
            res.json(userprofile)    
        }catch(err){
            console.log(err)
        }
    },

    async followUser(req, res){
        try{
            const { follower, following } = req.params
            User.findOneAndUpdate({ _id : follower }, { $push : { followingUser : following }}).exec((err, _)=>{
                if(err) console.log(err)
            })
            User.findOneAndUpdate({ _id : following }, { $inc : { followerCount : 1}}).exec((err, _)=>{
                if(err) console.log(err)
            })
            res.send("you have followed")
        }catch(err){
            console.log(err)
        }
    }
}