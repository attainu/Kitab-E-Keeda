var bcrypt = require("bcrypt");
var User = require("../../models/users");
const nodemailer = require('nodemailer')
var cryptoRandomString = require('crypto-random-string')
var otp = {};
var PasswordOtpController = {};


PasswordOtpController.generateotp = (req, res) => {
    User.findOne({
        "email": req.body.email
    }).exec((err, resp) => {
        if (err) console.log(err)
        console.log(resp)



        
    })

}

PasswordOtpController.checkotp = (req, res, next) => {
    if (req.body.otp == otp[req.session.otpid]) {
        req.session.destroy()
        next();
    } else {
        res.send("false");
    }
}









module.exports = PasswordOtpController;