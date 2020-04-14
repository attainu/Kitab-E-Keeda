
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
        type : Sequelize.STRING ,
        allowNull: false ,
        defaultValue: '30/06/1994'
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
        foreignKey: true,
        allowNull: false,
        references: {
            model: 'users',
            key: '_id'
        },
        
    } 
}


Profile.init(profileSchema, {
    sequelize,
    tableName: "profile"
})  



module.exports = Profile