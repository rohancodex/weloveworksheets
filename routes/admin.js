const express = require('express');
const router = express();
const connectionRequest = require("../config/database");
const path = require('path');
const bodyParser = require("body-parser");
var session = require('express-session');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
const app = require('../app');
const ejs = require('ejs');
const studentRoutes = require('./student');
const authRoutes = require('./auth');


router.use(cookieParser());



router.get('/', (req, res) => {
    if (req.session.admin) {
        res.redirect('/admin/admin-dashboard');
    } else {
        res.render('admin-login', { message: '' });
    }
})

router.post('/login', (req, res) => {
    let adminMail = req.body.email;
    let adminPass = req.body.password;
    if (adminMail !== process.env.ADMIN_MAIL || adminPass !== process.env.ADMIN_PASS) {
        res.render('admin-login', { message: 'Wrong credentials' });
    } else {
        req.session.admin = true;
        req.session.save();
        res.redirect('/admin/admin-dashboard');
    }
})
router.get('/admin-dashboard', (req, res) => {
    if (req.session.admin) {
        let sql = "SELECT * FROM TEACHERS";

        mysqlConnection = connectionRequest();
        mysqlConnection.query(sql, (err, result) => {
            mysqlConnection.destroy();
            res.render('admin-dashboard', { teacher: result });
        })
    } else {
        res.redirect('/admin');
    }
})

// delete data
router.get('/delete/(:id)', function(req, res) {
    console.log(req.session.admin);
    let id = req.params.id;

    deleteResponsesTeacher(id);
    deleteStudents(id);
    mysqlConnection = connectionRequest();
    mysqlConnection.query('DELETE FROM teachers WHERE id = ' + id, (err, result) => {
        //if(err) throw err
        if (err) {
            mysqlConnection.destroy();
            console.error(err);
        } else {
            mysqlConnection.destroy();
            res.redirect('/admin/admin-dashboard');
        }
    });
});


router.get('/student/(:id)', (req, res) => {
    if (req.session.admin) {
        let id = req.params.id;
        mysqlConnection = connectionRequest();

        let sql = "SELECT * FROM students WHERE teacher_id = ?";
        mysqlConnection.query(sql, id, (err, result) => {
            if (err) throw err;
            res.render('admin-student', { student: result });
        })
    } else {
        res.redirect('/admin');
    }

})

router.get('/delete/student/(:id)', (req, res) => {
    console.log(req.session.admin);
    let id = req.params.id;
    console.log(id);
    deleteResponses(id);


    mysqlConnection = connectionRequest();
    mysqlConnection.query('DELETE FROM students WHERE sid = ' + id, (err, result) => {
        //if(err) throw err
        if (err) {
            mysqlConnection.destroy();
            console.error(err);
        } else {
            mysqlConnection.destroy();
            res.redirect('back');
        }
    });
});




function deleteResponses(id) {
    mysqlConnection = connectionRequest();
    mysqlConnection.query('DELETE FROM responses WHERE student_id = ' + id, (err, result) => {
        if (err) {
            mysqlConnection.destroy();
            console.error(err);
        } else {
            mysqlConnection.destroy();
            return;
        }
    })
};


function deleteResponsesTeacher(id) {
    mysqlConnection = connectionRequest();
    mysqlConnection.query('DELETE FROM responses WHERE teacher_id = ' + id, (err, result) => {
        if (err) {
            mysqlConnection.destroy();
            console.error(err);
        } else {
            mysqlConnection.destroy();
            return;
        }
    })
};

function deleteStudents(id) {
    mysqlConnection = connectionRequest();
    mysqlConnection.query('DELETE FROM students WHERE teacher_id = ' + id, (err, result) => {
        if (err) {
            mysqlConnection.destroy();
            console.error(err);
        } else {
            mysqlConnection.destroy();
            return;
        }
    })
};
module.exports = router;