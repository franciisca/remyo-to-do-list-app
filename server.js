//Declare Variables
const path = require('path')
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require("./config/database");
const TodoTask = require("./models/todolist");
const homeRoutes = require("./routes/home")
const editRoutes = require("./routes/edit")

require('dotenv').config({path: './config/.env'})

//passport
require('./config/passport')(passport)

connectDB()

//Set Middleware
app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(logger('dev'))

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
//Set Routes
app.use('/', homeRoutes)
app.use('/edit', editRoutes)


//Start Server
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})    