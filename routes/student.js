const express = require('express');
const router = express();
const mysqlConnection = require("../config/database");
const path = require('path');
const app = require('../app');
const bodyParser = require("body-parser");
const ejsLint = require('ejs-lint');
const ejs = require('ejs');
var flash = require('express-flash');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const papa = require('papaparse');
// var session = require('express-session');

const authRoutes = require("./auth");
var cookieParser = require('cookie-parser');

router.use(cookieParser());



// router.use(flash());
router.use(bodyParser.urlencoded({ extended: true }));


//view and retrieve data
router.get('/', (req, res) => {
    // exports sess = req.session; 
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    var id = req.session.user[0].id;
    mysqlConnection.query('SELECT * FROM students WHERE teacher_id = ?', [id], (err, results) => {
        if (err) throw err;


        res.render('student', { title: 'Student List', data: results });
    });

});

router.get('/edit/(:id)', (req, res) => {

    console.log(req.session.loggedin);
    let id = req.params.id;

    mysqlConnection.query('SELECT * FROM students WHERE sid = ' + id, function(err, rows, fields) {
        if (err) throw err

        // if user not found
        if (rows.length <= 0) {
            // req.flash('error', 'Book not found with id = ' + id)
            res.redirect('/student')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('student-edit', {
                title: 'Edit Student',
                id: rows[0].sid,
                name: rows[0].full_name,
                age: rows[0].age
            })
        }
    })
});


// update student data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let full_name = req.body.name;
    let age = req.body.age;
    let errors = false;

    if (full_name.length === 0 || age.length === 0) {
        errors = true;

        // set flash message
        // req.flash('error', "Please enter name and age");
        // render to add.ejs with flash message
        res.render('student-edit', {
            id: req.params.id,
            name: full_name,
            age: age
        })
    }

    // if no error
    if (!errors) {

        var form_data = {
                full_name: full_name,
                age: age
            }
            // update query
        mysqlConnection.query('UPDATE students SET ? WHERE sid = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                throw err;
                // set flash message
                // req.flash('error', err)
                // render to edit.ejs
                // res.render('student-edit', {
                //     id: req.params.id,
                //     name: form_data.name,
                //     age: form_data.age
                // })
            } else {

                // req.flash('success', 'student successfully updated');
                res.redirect('/student');
            }
        })
    }
})


// delete data
router.get('/delete/(:id)', function(req, res, next) {
    console.log(req.session.loggedin);
    let id = req.params.id;
    deleteResponses(id);
    mysqlConnection.query('DELETE FROM students WHERE sid = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            // 
            throw err;
            // redirect to books page

        } else {
            // set flash message
            // req.flash('success', 'Book successfully deleted! ID = ' + id)
            // redirect to books page

            res.redirect('/student');
        }
    });
});

function deleteResponses(id) {
    mysqlConnection.query('DELETE FROM responses WHERE student_id = ' + id, function(err, result) {
        if (err) {
            throw err;
        } else {
            return;
        }
    })
};







//post data
router.post("/create", (req, res) => {
    console.log(req);

    function capitalizeFirstLetter(str) {

        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalized;
    }


    var fname = capitalizeFirstLetter(req.body.firstname);
    var lname = capitalizeFirstLetter(req.body.lastname);
    lname = " " + lname;
    var fullname = fname.concat(lname);
    var age = req.body.age;
    console.log(fullname);
    var teacher_id = req.session.user[0].id;
    console.log('post request received');
    var sql = mysqlConnection.format("INSERT INTO students (full_name, age,teacher_id) VALUES (?, ?, ?)", [fullname, age, teacher_id]);

    mysqlConnection.query(sql, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/student');
    });
});

router.post("/create-bulk", upload.any(), (req, res) => {
    let temp = fs.createReadStream(req.files[0].path, 'utf8');
    let teacher = req.session.user[0].id;
    papa.parse(temp, {
        header: false,
        dynamicTyping: true,
        complete: function(results, temp) {
            let data = results["data"];
            let sql = "INSERT INTO students (full_name,age,teacher_id) VALUES ";
            data.forEach(temp => {
                temp[1] = temp[0].split(' ').join("") + ' ' + temp[1];
                temp.push(teacher);
                temp.shift();
                sql = sql + "('" + temp[0] + "'," + temp[1] + "," + temp[2] + "),";
            });
            sql = sql.slice(0, -1);
            sql = sql + ";";
            console.log(sql);

            mysqlConnection.query(sql, (err, result) => {
                if (err) throw err;
                console.log('record inserted');
                fs.unlinkSync(req.files[0].path);
                res.redirect('/student');
            });
        }
    });


})

//obtain data
// router.get('/',(req,res) => {
//     mysqlConnection.query("SELECT * from students", (err,rows,fields)=>{
//         if(err) throw err;
//         res.send(rows);
//     })
// })

module.exports = router;