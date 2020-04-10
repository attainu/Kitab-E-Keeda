const express = require('express');
const router = express.Router();

const db = require('../db');

 const Usermodel = require('../models/Users');



router.get('/' ,(req,res) =>  
 Usermodel.findAll()
.then(Users => {
    console.log(Users);
    res.sendStatus(200);
    
})
.catch (err => console.log(err)));

router.get('/add' , (req,res)=> {
  const  data  =  ({
    UserName  : 'Lipi',
    email: 'monalisa@gmail.com',
    password : '123456789',
    
  })

  let { UserName ,email ,password } = data;
  // Insert user data in to datbase tabel
  Usermodel.create ({
    UserName ,
    email ,
    password ,

  })
  .then ( user =>res.redirect('/user'))
  .catch (err => console.log(err))


});

module.exports = router;










