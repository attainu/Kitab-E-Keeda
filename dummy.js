  var cryptoRandomString = require('crypto-random-string') 
       var otp  = {} ;

var userOtp = Math.floor(Math.random() * 10000000000) + "";
                userOtp = userOtp.slice(0, 5);
                
                let  id = cryptoRandomString({
                    length: 10
                })
              otp[id] = userOtp

                console.log(otp)
