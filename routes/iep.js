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
    res.render('IEP2');
})

router.get('/behavioural-iep', (req, res) => {
    res.render('behavioural-iep');
})

router.get('/iep-dashboard', (req, res) => {
    res.render('iep-dashboard');
})

// router.get('/academic-iep', (req, res) => {
//     res.render('academic-iep-1');
// })



router.get('/academiciep/spellingandphonics', (req, res) => {
    res.render('academic-iep-1');
})

router.get('/academiciep/reading', (req, res) => {
    res.render('academic-iep-2');
})

router.get('/academiciep/readingcomprehension', (req, res) => {
    res.render('academic-iep-3');
})

router.get('/academiciep/grammar', (req, res) => {
    res.render('academic-iep-4');
})

router.get('/academiciep/writing', (req, res) => {
    res.render('academic-iep-5');
})

router.get('/academiciep/math', (req, res) => {
    res.render('academic-iep-6');
})

router.get('/academiciep/perception', (req, res) => {
    res.render('academic-iep-7');
})

module.exports = router;