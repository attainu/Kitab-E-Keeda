var bcrypt = require("bcrypt");
var User = require("../../models/users");
const nodemailer = require('nodemailer')
var cryptoRandomString = require('crypto-random-string')
var otp = {};


var PasswordOtpController = {}


PasswordOtpController.generateotp = (req, res) => {
    User.findOne({
            "email": req.body.email
        })
        .then(user => {
            if (user) {
                res.send("user exists");
            } else {
                var userOtp = Math.floor(Math.random() * 10000000000) + "";
                userOtp = userOtp.slice(0, 5);
                req.session.otpid = cryptoRandomString({
                    length: 10
                })
                otp[req.session.otpid] = userOtp
                console.log(userOtp);
                sendVerificationEmail(req.body.email, req.session.otpid).catch(console.error);
                res.send("otp sent");
            }
        })
        .catch(err => console.log(err));
}



async function sendVerificationEmail(email, id) {
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

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "rmanas000@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Verification ✔", // Subject line
        text: "" + otp[id], // plain text body
        html: "<b>Welcome to KitabEkeeda.Your KitabEkeeda verification code is " +
            otp[id] +
            "</b>" // html body
    }, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.send('main', {
            msg: 'Email has been sent'
        });
    });
}



module.exports  = PasswordOtpController ;