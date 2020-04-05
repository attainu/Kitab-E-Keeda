const express = require('express');
var dotenv = require("dotenv")
const morgan = require('morgan')

dotenv.config();
require('./db');
const app = express();
var path = require('path');
app.use(morgan('combined'))
const instance = require('./Razorpay')

//routes
const userApiRoute = require('./routes/apiRoutes/userApiRoute')
const booksApiRoute = require('./routes/apiRoutes/booksApiRoute')
const reviewApiRoute = require('./routes/apiRoutes/reviewApiRoutes')
const getallGenres = require('./routes/apiRoutes/booksApiRoute')
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/profile', express.static('uploads'));

app.get('/', (req, res) => res.send('hello world'))

//routes global middlewares
app.use(userApiRoute,booksApiRoute,reviewApiRoute,getallGenres);




module.exports = app