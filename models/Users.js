
const  posts = require('./posts')
const sequelize = require('../db');
const { compare, hash } = require('bcrypt')
const { Sequelize, Model } = require("sequelize");
class User extends Model {
    static async findByEmailAndPassword(email, password) {
      try {
        const user = await User.findOne({
          where: {
            email
          }
        });
        if (!user) throw new Error("Incorrect credentials");  
        const isMatched = await compare(password, user.password);
        if (!isMatched) throw new Error("Incorrect credentials");
        return user;
      } catch (err) {
        throw err;
      }
    }
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
    // genres: {
    //     type : Sequelize.ARRAY(Sequelize.STRING),
    //     allowNull: true,
    //     defaultValue: []
        
        
    // },
    // favAuthors : {
    //     type: Sequelize.ARRAY(Sequelize.STRING),
    //     allowNull: true,
        
    // },
    // booksRead:{
    //     type : Sequelize.ARRAY(Sequelize.STRING),
    //     allowNull: true

    // },
    // posts: {
    //     type: Sequelize.ARRAY(Sequelize.UUID),
    //     allowNull: true,
       
    //   },

    // followingUser:{
    //     type: Sequelize.ARRAY(Sequelize.UUID),
    //     allowNull: true ,
        
    // },
    follwerCount:{
        type: Sequelize.INTEGER,
        defaultValue:0,
        allowNull: true
    }

};





User.init(userSchema, {
    sequelize,
    tableName: "users" 
})  

User.beforeCreate(async user => {
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
  });
  
  User.beforeUpdate(async user => { 
    if (user.changed("password")) {
      const hashedPassword = await hash(user.password, 10);
      user.password = hashedPassword;
    }
  });

module.exports = User;





