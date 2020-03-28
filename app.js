const express = require('express');
var dotenv = require("dotenv")
dotenv.config();
require('./db');
const app = express();

//routes
const userApiRoute = require('./routes/apiRoutes/userApiRoute')
const booksApiRoute = require('./routes/apiRoutes/booksApiRoute')

app.use(express.json())

app.get('/', (req, res) => res.send("basic response"))

//routes global middlewares
app.use(userApiRoute);
app.use(booksApiRoute);


module.exports = app