const express = require('express')
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
mongoose
  .connect(db, { useNewUrlParser: true})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require("./routes/api/users");


//using passport
app.use(passport.initialize());
require('./config/passport')(passport)



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// api call after this line

app.use("/api/users", users);









const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
