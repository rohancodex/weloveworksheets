const express = require("express");
var createError = require('http-errors');
const app = express();

const bodyParser = require("body-parser");
const ejs = require('ejs');
var flash = require('express-flash');

app.use(express.static("public"));
var session = require('express-session');

var cookieParser = require('cookie-parser');


// console.log(session);
const studentRoutes = require("./routes/student");
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const iepRoutes = require("./routes/iep");
// const sheet = require('./sheets');
const mysqlConnection = require('./config/database');
// const ejsLint = require('ejs-lint');

const expressLayouts = require('express-ejs-layouts');
const files = require('./routes/files');
const dataRoutes = require('./routes/datatracking');
const worksheetRoutes = require('./routes/worksheets');
// const teacher = require('./routes/auth/sess')
app.use(cookieParser());




var myLogger = function(req, res, next) {
        console.log('LOGGED')
        next()
    }
    // app.use(myLogger);



app.use(session({
    secret: 'worksheetswelove',
    resave: true,
    saveUninitialized: true,
    maxAge: Date.now() + (30 * 86400 * 1000)
})); // session secret


// var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
// if(fullUrl!== 'http://localhost:3000/login'){
// res.redirect('/login');
// }






// USE BODY-PARSER MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());


app.use('/datatracking', dataRoutes);
app.use('/student', studentRoutes);
app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/worksheet', worksheetRoutes);
app.use('/files', files);
app.use('/iep', iepRoutes);
app.use(express.json());

// SET VIEW ENGINE
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');




















app.listen('3000', () => {
    console.log("server started on port 3000");
});

module.exports = app;




// app.use(
//     '/ftp',
//     express.static('public'),
//     serveIndex('public', { icons: true })
//   )