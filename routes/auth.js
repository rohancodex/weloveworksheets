const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');
const connectionRequest = require("../config/database");
const session = require('express-session');
const ejs = require('ejs');
const razorpay = require('razorpay');
router.use(express.static("public"));

const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));



router.post('/register', async(req, res) => {
    console.log(req.body);

    const { name, email, password, confirmPassword } = req.body;

    mysqlConnection = connectionRequest();

    mysqlConnection.query('SELECT email FROM teachers WHERE email = ?', [email], async(err, results) => {

        try {

            if (results.length > 0) {
                return res.render('register', {
                    message: 'That email is already in use'
                });
            } else if (password !== confirmPassword) {
                return res.render('register', {
                    message: 'Passwords do not match'
                });
            } else {
                let hashedPassword = await bcrypt.hash(password, 8);


                mysqlConnection.query('INSERT INTO teachers (name,email,password,isActive) values (?,?,?,?)', [name, email, hashedPassword,false], (err, results) => {
                    if (err) {
                        mysqlConnection.destroy();
                        console.error(err);
                    } else {
                        mysqlConnection.destroy();
                        res.redirect('/login');
                    }
                });
            }
        } catch {
            mysqlConnection.destroy();
            console.error(err);
        }
    })

});

router.post('/login', async(req, res) => {

    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        res.redirect('/login');
    }
    mysqlConnection = connectionRequest();
    mysqlConnection.query('SELECT * FROM teachers WHERE email=?', [email], async(err, results) => {
        try {
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                return res.render('login', {
                    message: 'E-mail or password is incorrect'
                })
            } else {
                req.session.loggedin = true;
                req.session.user = results;

                var hour = 3600000;
                req.session.cookie.expires = new Date(Date.now() + hour);
                req.session.cookie.maxAge = 3600 * hour;
                req.session.save();
                mysqlConnection.destroy();
                return res.redirect('/dashboard');
            }
        } catch {
            mysqlConnection.destroy();
            console.error(err);
        }

    })
});



module.exports = router;