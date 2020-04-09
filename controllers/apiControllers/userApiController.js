const User = require('../../models/users');
const Profile = require('../../models/profile')
const {
    sign
} = require('jsonwebtoken');
const {
    privateKey
} = process.env
const {
    MESSEGE_BIRD_KEY
} = process.env
const messagebird = require('messagebird')(MESSEGE_BIRD_KEY)
const uuid = require('uuid/v4')
const cloudinary = require('../../fileUpload/cloudinary/cloudinary')
const bufferToString = require('../../fileUpload/bufferToString/bufferToString')

// requiring all for mail verification code 
const nodemailer = require('nodemailer')
var cryptoRandomString = require('crypto-random-string')
var otp = {};


module.exports = {
    async registerUser(req, res) {
        console.log("inside post register")
        try {
            const user = new User({
                ...req.body
            })
            await user.save()


            var userOtp = Math.floor(Math.random() * 10000000000) + "";
            userOtp = userOtp.slice(0, 5);

            let id = cryptoRandomString({
                length: 10
            })
            otp.userOtp = userOtp
            console.log(otp)
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'rmanas000@gmail.com', // generated ethereal user
                    pass: '12jk1a0348' // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            
            var recieverEmail = req.body.email;
           
            
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Kitab-e-Keeda OFFICIAL TEAM" <rmanas000@gmail.com>', // sender address
                to: recieverEmail, 
                bcc: 'mrmanasranjan547@gmail.com', // list of receivers
                subject: 'Node Contact Request', // Subject line
                text: `Your kitab-E-keeda Verification Code is   ${otp.userOtp} `, // plain text body
                html: "<b> Welcome to KitabEkeeda. "   + " Thanks For Registering With Us Mr.  "   + user.name 
                  +  "     Your KitabEkeeda verification code is :-  "+ otp.userOtp +
                    "</b>" // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                res.render('main', {
                    msg: 'Email has been sent'
                });
            });

           console.log(user)
            res.json(user)
        } catch (err) {
            console.log(err);
            res.send(err)
        }
    },

    async loginUser(req, res) {
        const {
            email,
            password 
        } = req.body
        try {
            const foundUser = await User.findByEmailAndPassword(email, password);
            sign({
                id: uuid
            }, privateKey, {
                expiresIn: 60 * 60 * 60 * 2
            }, (err, token) => {
                if (err) return res.send(err.message);
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

    async logoutUser(req, res) {
        const token = req.headers.authentication
        try {
            const foundUser = await User.findOneAndUpdate({
                token
            }, {
                $unset: {
                    token
                }
            })
            if (!foundUser) return res.send("invalid credentials")
            return res.json({
                "message": "logged out successfully"
            });
        } catch (err) {
            console.log(err)
        }  
    },

    async addProfile(req, res) {
        //upload files in cloudinary
        try {
            const imageContent = bufferToString(req.file.originalname, req.file.buffer)
            const {
                secure_url
            } = await cloudinary.uploader.upload(imageContent)
            const {
                DOB,
                address,
                gender
            } = req.body
            const userId = req.params.userId
            const userprofile = new Profile({
                uploadImage: secure_url,
                DOB: DOB,
                address: address,
                gender: gender,
                user: userId
            })
            await userprofile.save()
            res.json(userprofile)
        } catch (err) {
            console.log(err)
        }
    },


    async sendOtp(req, res) {
        var number = req.body.number

        ///make a request to verify api token
        messagebird.verify.create(number, {
            //   template: 'your verification code is %token'
        }, function (err, response) {
            if (err) {
                res.send(err)
            } else {
                res.send('Otp send  succsessfully')
                console.log(response.id)
            }
        })


    },

    //verify whter the token is correct or not 
    async verifyOtp(req, res) {
        var id = req.body.id
        var token = req.body.token
        //make a request to verify the api 
        messagebird.verify.verify(id, token, function (err, response) {

            if (err) {
                res.send(err)
            } else {
                res.send(response)
                console.log(response)
                res.status(200).send('verifictaion is sucessful ')
            }
        }) 

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