const { sequelize } =require('sequelize')
const uuid = require('uuid/v4')

const postModel = sequelize.define( ' posts', {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
   
    post : {
        type : sequelize.STRING,
        allowNull: false
    },
    user : {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
    },
    comments : [{
        type: Sequelize.INTEGER,
        references: {
            model: 'comments',
            key: 'id'
        }}
    ],
    likes : [{
        type: Sequelize.INTEGER,
        references: {
            model: 'likes',
            key: 'id'
        }
    }],
    likesCount : {
        type : sequelize.INTEGER,
        defaultValue : 0
    },
    disLikesCount : {
        type : sequilize.INTEGER,
        defaultValue : 0
    }
})


module.exports = postModel