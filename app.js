const express = require('express');
var dotenv = require("dotenv")
dotenv.config();
require('./db');
const app = express();

//routes
const userApiRoute = require('./routes/apiRoutes/userApiRoute')


app.get('/', (req, res) => res.send("basic response"))

// global middlewares
app.use(userApiRoute);


module.exports = app