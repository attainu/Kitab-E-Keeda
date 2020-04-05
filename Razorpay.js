
const  Razorpay = require('razorpay')
const {RAZORPAY_KEY_ID,RAZORPAY_KEY_SECET} =process.env
var instance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECET,
  });


  module.exports = instance;