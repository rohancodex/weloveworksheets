// const express = require ('express');
// const router = express();
// const serveIndex = require('serve-index');
// const mysqlConnection = require("../database");

// router.use(
//     '/ftp',
//     express.static('public/ftp'),
//     serveIndex('public/ftp', { icons: true })
//   )

const express = require('express');
var router = express.Router();
const connectionRequest = require("../config/database");
const ejs = require('ejs');
router.use(express.static("public"));

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/register', (req, res) => {
    res.render('register', { message: '' });
})

router.get('/login', (req, res) => {
    if (req.session.loggedin) {
        res.redirect('/dashboard');
    } else {
        res.render('login', { message: '' });
    }
});

router.get('/about', function(req, res) {
    res.render('about');
});

router.get('/dashboard', function(req, res) {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    res.render('dashboard');
});

/* GET users listing. */
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;