
const logger = require('../config/logger')
const express = require('express');
var router = express.Router();
const connectionRequest = require("../config/database");
const ejs = require('ejs');
const isLoggedIn = require("./authorization.js");
router.use(express.static("public"));

//landing page
router.get('/', async(req, res) => {
   await res.render('index');
})

//register page
router.get('/register', async(req, res) => {
    if (!req.session.loggedin) {
       await res.render('register', { message: '' });
    } 
    else{
        await res.redirect('/dashboard'); 
    }
})

//login page
router.get('/login', async(req, res) => {
    if (!req.session.loggedin) {
        await res.render('login', { message: '' });
    } 
    else{
        await res.redirect('/dashboard');
    }
    });

//datatracking landing
router.get('/datatrackingandanalytics', async(req, res) => {
   await res.render('datatracking-landing');
})

//about page
router.get('/about', async function(req, res) {
    await res.render('about');
});

//contact page
router.get('/contact',async function(req, res) {
    await res.render('contact');
});

router.post('/contact',async function(req, res) {
    await res.render('contact');
});

//dashboard
router.get('/dashboard',isLoggedIn,async function(req, res) {
    
    await res.render('dashboard');
});

//profile
//landing page
router.get('/profile',isLoggedIn, async(req, res) => {
    
    try{
        res.render('profile');
    }
    catch(err){
        console.log(err)
    }
 })

//logout
router.get('/logout',async function(req, res) {
    
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;