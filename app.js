const express = require('express');

var dotenv = require("dotenv")
dotenv.config();

require('./db'); 

const app = express();

app.get('/', (req, res) => {
    res.send('hello world ');
});

// Gig routes
app.use('/user' ,require('./routes/userRoute'));



module.exports= app;