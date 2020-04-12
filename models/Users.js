
const  posts = require('./posts')
const sequelize = require('../db');

const { Sequelize, Model } = require("sequelize");
class User extends Model {

}
// name of table in kitabEkeeda is Users  

const userSchema = {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
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
        allowNull:true,
        defaultValue: false

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
        type: Sequelize.STRING,
        references: {
            model: posts,
            key: '_id'
        }
    },
    followingUser:{
        type: Sequelize.INTEGER
    },
    follwerCount:{
        type: Sequelize.INTEGER,
        defaultValue:0
    }

};


User.init(userSchema, {
    sequelize,
    tableName: "users"
})  

module.exports = User;





