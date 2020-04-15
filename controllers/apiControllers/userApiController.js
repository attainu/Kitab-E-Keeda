const User = require('../../models/Users');
const Profile = require('../../models/profile')
const { sign } = require('jsonwebtoken');
const uuid = require('uuid/v4')
const { PrivateKey, mailPassword }= process.env 
const cloudinary = require('../../fileUpload/cloudinary/cloudinary')
const bufferToString = require('../../fileUpload/bufferToString/bufferToString')
var otp = { userotp : 0 };
const nodemailer = require('nodemailer')

module.exports = {
    async registerUser(req, res) {
        try {
            console.log(req.body)
            const user = await User.create({...req.body})
            //random otp creating and sending
            var userOtp = Math.floor(Math.random() * 10000000000) + "";
            userOtp = userOtp.slice(0, 5);
            otp.userOtp = userOtp

            console.log(otp)
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, 
                auth: {
                    user: 'rmanas000@gmail.com', 
                    pass: mailPassword 
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
            // console.log(foundUser)
            sign({id : uuid} , PrivateKey, { expiresIn : 60*60*10 }, (err, token) => {
                if(err) return res.send(err.message);
                foundUser.token = token 
            //    const tokenUpdated =  User.update( { token : foundUser.token }, {where:{email: foundUser.email }})
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
            const foundUser = await User.update( { token: null },{where :{token :token }})
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
            if(req.file == undefined || req.file == null){
                const { DOB, address, gender } = req.body
                const user = req.params.userId
                const userprofile = await Profile.create({DOB, address, gender, user })
                
                res.json(userprofile)             
            }else{
                const { originalname, buffer } = req.file
                const imageContent = bufferToString( originalname, buffer)
                const { secure_url } = await cloudinary.uploader.upload(imageContent)
                const { DOB, address, gender } = req.body
                const user = req.params.userId
                const userprofile =  await Profile.create({ uploadImage : secure_url, DOB, address, gender, user })
                
                res.json(userprofile)             
            }   
        }catch(err){
            console.log(err)
            res.send(err)
        }
    },

    async verifyUser(req, res){
        try{
            const { userId }  =req.params
            const { code } = req.headers
            Code = parseInt(code)
            const foundUser = await User.findOne({where:{_id: userId}}) 
            if(!foundUser) return res.status(400).send("invalid credentials")
            else if(typeof(Code) !== 'number') return res.send("code format mismatched")
            else if(Code == otp.userOtp ) {
                const foundUser = await User.update( { verified : true }, {where:{ _id : userId }})
                if(!foundUser) return res.status(400).send("invalid credentials")
                res.status(200).json({ msg : "code verified" })  
            }else return res.send("code didnt match")
        }catch(err){
            console.log(err)
        }
    },

    async searchUser(req, res){
        try{
            const { userId } = req.params
            const foundUser = await User.findOne({ _id : userId })
            if(!foundUser) return res.send("invalid credentials")
            res.send(foundUser)
        }catch(err){
            console.log(err)
        }
    }
}