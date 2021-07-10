const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');
const mysqlConnection = require("../config/database");
const session = require('express-session');
const ejs = require('ejs');

router.use(express.static("public"));

const bodyParser = require("body-parser");



router.use(bodyParser.urlencoded({ extended: false }));


router.post('/register', (req, res) => {
    console.log(req.body);

    const { name, email, password, confirmPassword } = req.body;
    console.log(name);
    mysqlConnection.query('SELECT email FROM teachers WHERE email = ?', [email], async(err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            });
        } else if (password !== confirmPassword) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);


        mysqlConnection.query('INSERT INTO teachers SET ?', { name: name, email: email, password: hashedPassword }, (err, results) => {
            if (err) throw err;
            else {
                res.redirect('/login');
            }
        });
    })

});

router.post('/login', (req, res) => {

    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        res.redirect('/login');
    }
    mysqlConnection.query('SELECT * FROM teachers WHERE email=?', [email], async(err, results) => {
        if (err) {
            res.redirect('/login');
        }
        if (!results || !(await bcrypt.compare(password, results[0].password))) {
            res.render('login', {
                message: 'E-mail or password is incorrect'
            })
        } else {
            req.session.loggedin = true;
            req.session.user = results;

            var hour = 3600000;
            req.session.cookie.expires = new Date(Date.now() + hour);
            req.session.cookie.maxAge = 3600 * hour;
            req.session.save();

            res.redirect('/student');
        }

    })
});

// exports.getteacherid(req,res);

// exports.auth = (req,res,next) =>{
//     if (req.session.loggedin) {
//         var hour = 3600000;
//         req.session.cookie.expires = new Date(Date.now() + hour);
//         console.log('logged');
//         next()   
//     } 
//     else{
//         res.redirect('/login');
//     }
//   };

// exports.authenticate = (req,res)=>{

// } 
// module.exports.isAuth = function (req,res,next) {
//     if (req.session.loggedin) {
//                 var hour = 3600000;
//                 req.session.cookie.expires = new Date(Date.now() + hour);
//                 console.log('loggedin');
//                 return next()
//             } 
//             else{
//                 return;
//             }
//           }

module.exports = router;