
const sequelize = require('../db');
const User = require('./users')
const { Sequelize, Model } = require("sequelize");
class Profile extends Model {

}
const profileSchema =  {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
    
    uploadImage : {
        type : Sequelize.STRING ,
        allowNull: false
    },
    DOB : {
        type : Sequelize.DATE ,
        allowNull: false ,
        defaultValue: Sequelize.NOW
    },
    address : {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender : {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue : 'male'
    },
    user : {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
            model: User,
            key: '_id'
        },
        
    } 
}


Profile.init(profileSchema, {
    sequelize,
    tableName: "profile"
})  



module.exports = Profile