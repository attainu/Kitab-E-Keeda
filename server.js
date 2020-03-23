const express = require('express');
var dotenv = require("dotenv")
dotenv.config();

require('./db');
const app = express();