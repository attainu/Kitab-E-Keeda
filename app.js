const express = require('express');
var dotenv = require("dotenv")
dotenv.config();
require('./db');
const app = express();
var path = require('path');

//routes
const userApiRoute = require('./routes/apiRoutes/userApiRoute')
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/profile', express.static('uploads'));

app.get('/', (req, res) => res.send("basic response"))

//routes global middlewares
app.use(userApiRoute);


module.exports = app