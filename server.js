const express = require('express');

var dotenv = require("dotenv");
dotenv.config();
require("./db");

const app = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure express body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));


var port  = process.env.PORT || 8080; // set our port

app.get('/', (req, res) => {
  res.send([{
    name1:"amit",
    Name2 : "Manas"

  }]);
});

app.listen(port);
console.log(`Port is Listening Magic happens on port ${port}`);







