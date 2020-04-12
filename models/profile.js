const { sequelize } =require('sequelize');
const sequelize = require('../db');
const User = require('./users')
const { Sequelize, Model } = require("sequelize");
class Profile extends Model {

}
const profileSchema = sequelize.define ( 'profile' , {
    
    uploadImage : {
        type : sequelize.STRING ,
        allowNull: false,
        defaultValue : "https://songtr.ee/songs/userimages/cache/imgid822526_1000x1000.jpg"
    },
    DOB : {
        type : sequelize.DATE ,
        allowNull: false ,
        defaultValue: sequelize.NOW
    },
    address : {
        type: sequelize.STRING,
        allowNull: false
    },
    gender : {
        type: sequelize.STRING,
        allowNull: false,
        defaultValue : 'male'
    },
    user : {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        
    } 
})


Profile.init(profileSchema, {
    sequelize,
    tableName: "profile"
})  



module.exports = Profile