const express = require("express");
var createError = require('http-errors');
var cookieParser = require('cookie-parser');

const bodyParser = require("body-parser");
const ejs = require('ejs');
var flash = require('express-flash');
const app = express();
app.use( express.static( "public" ) );
var session = require('express-session');


app.use(session({ 
    secret: '123456cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));



const studentRoutes =  require("./routes/student");
const homeRoutes =  require("./routes/home");
const authRoutes = require("./routes/auth");
// const sheet = require('./sheets');
const mysqlConnection = require('./database');
const ejsLint = require('ejs-lint');
const serveIndex = require('serve-index');
const expressLayouts = require('express-ejs-layouts');
const files = require('./routes/files');


app.use(cookieParser());


// app.use('/pdf',sheet);
app.use('/student', studentRoutes);
app.use('/', homeRoutes);
app.use('/auth',authRoutes);
app.use('/files',files);
app.use(express.json());
// SET VIEW ENGINE
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views','views');

app.use(flash());


// USE BODY-PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({extended:false}));

 











app.listen('3000',()=>{
    console.log("server started on port 3000");
});

module.exports = app;




// app.use(
//     '/ftp',
//     express.static('public'),
//     serveIndex('public', { icons: true })
//   )
