const { sequelize } =require('sequelize');

const profileModel = sequelize.define ( 'profile'  {
    
    uploadImage : {
        type : sequelize.STRING ,
        allowNull: false,
        defaultValue :
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
            model: 'users',
            key: 'id'
        },
        
    } 
})


module.exports = profileModel