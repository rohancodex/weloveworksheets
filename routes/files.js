const express = require('express');
const router = express();
const mysqlConnection = require("../config/database");
const path = require('path');
const bodyParser = require("body-parser");
var session = require('express-session');

var cookieParser = require('cookie-parser');
var flash = require('express-flash');
const app = require('../app');
const ejs = require('ejs');
const studentRoutes = require('./student');
const authRoutes = require('./auth');
router.use(cookieParser());


router.get('/', (req, res) => {
    res.render('files');
})




module.exports = router;