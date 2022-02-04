const express = require("express");

const app = express();
const Razorpay = require('razorpay');
const bodyParser = require("body-parser");
const ejs = require('ejs');

const logger = require('./config/logger');
app.use(express.static("public"));
var session = require('express-session');

var cookieParser = require('cookie-parser');


const studentRoutes = require("./routes/student");
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const iepRoutes = require("./routes/iep");
const adminRoute = require("./routes/admin.js");
const paymentRoute = require("./routes/payment");

const mysqlConnection = require('./config/database');


const expressLayouts = require('express-ejs-layouts');
const files = require('./routes/files');
const dataRoutes = require('./routes/datatracking');
const worksheetRoutes = require('./routes/worksheets');

app.use(cookieParser());

// session secret
app.use(session({
    secret: 'worksheetswelove',
    resave: true,
    saveUninitialized: true,
    maxAge: Date.now() + (30 * 86400 * 1000)
})); 

// USE BODY-PARSER MIDDLEWARE
app.use(express.urlencoded({ extended: false }));

app.use('/datatracking', dataRoutes);
app.use('/student', studentRoutes);
app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/worksheet', worksheetRoutes);
app.use('/files', files);
app.use('/iep', iepRoutes);
app.use('/admin', adminRoute);
app.use('/pricing',paymentRoute );
app.use(express.json());

// SET VIEW ENGINE
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen('50000', () => {
    console.log("server started on port 50000");
});

module.exports = app;




