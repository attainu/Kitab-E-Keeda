const express = require('express');
// var dotenv = require("dotenv")
// dotenv.config();
require('./db');
const app = express();

app.get('/', (req, res) => res.send("basic response"))

module.exports = app