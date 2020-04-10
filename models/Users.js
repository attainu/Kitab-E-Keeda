const Sequelize = require('sequelize');

const db = require('../db');


// name of table in kitabEkeeda is Users  

const Usermodel = db.define('Users',{
    UserName : {
        type : Sequelize.STRING
    },
    email : {
        type : Sequelize.STRING
    },
    password : {
        type : Sequelize.STRING
    },

});


module.exports = Usermodel;





