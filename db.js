const mongoose = require("mongoose");
const { MONGODB_URI, MONGODB_PASSWORD } = process.env

mongoose
  .connect(MONGODB_URI.replace("<password>", MONGODB_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err.message))   

  