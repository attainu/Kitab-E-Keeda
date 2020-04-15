const express = require('express');

var dotenv = require("dotenv")
dotenv.config();

require('./db'); 

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (_, res) => {
    res.send('hello world ');
});

const userApiRoute = require('./routes/apiRoutes/userApiRoute')
const booksApiRoute = require('./routes/apiRoutes/booksApiRoute')
const postsApiRoute = require('./routes/apiRoutes/postsApiRoutes')


//routes global middlewares
app.use(userApiRoute);
app.use(booksApiRoute);
app.use(postsApiRoute);



module.exports= app;