const Sequelize = require('sequelize');

const db = require('../db');


// name of table in kitabEkeeda is Users  

const User = db.define('users',{
    name : {
        type : Sequelize.STRING,
        force: true,
        allowNull: false
    },
    email : {
        type : Sequelize.STRING,
        force: true,
        allowNull: false,
        unique: true
    },
    password : {
        type : Sequelize.STRING,
        force: true,
        allowNull: false
    },
    verified : {
        type : Sequelize.BOOLEAN,
        allowNull:true

    },
    token : {
        type : Sequelize.STRING,
        allowNull: true
    },
    genres: {
        type : Sequelize.ARRAY,
        allowNull: true,
        defaultValue: false
    },
    favAuthors : {
        type: Sequelize.ARRAY,
        allowNull: true
    },
    booksRead:{
        type : Sequelize.ARRAY,
        allowNull: true

    },
    posts:{
        type: Sequelize.INTEGER,
        references: {
            model: 'posts',
            key: 'id'
        }
    },
    followingUser:{
        type: Sequelize.INTEGER
    },
    follwerCount:{
        type: Sequelize.INTEGER,
        defaultValue:0
    }

});


module.exports = User;





