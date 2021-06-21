const express = require ('express');
const router = express();
const mysqlConnection = require("../database");
const path = require('path');
const bodyParser = require("body-parser");
const ejsLint = require('ejs-lint');
const ejs = require('ejs');
var flash = require('express-flash');
var session = require('express-session');

router.use(session({ 
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
router.use(flash());
router.use(bodyParser.urlencoded({extended: true}));


//view and retrieve data
router.get('/',(req,res)=>{
    mysqlConnection.query('SELECT * FROM `students`', (err, results) => {
        if (err) throw err;
        
        console.log(results);
        res.render('student', { title: 'Student List', data: results});
    });
    
    
});

router.get('/edit/(:id)', (req, res)=>{
    let id = req.params.id;
   
    mysqlConnection.query('SELECT * FROM students WHERE sid = ' + id, function(err, rows, fields) {
        if(err) throw err
         
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

    if(full_name.length === 0 || age.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter name and age");
        // render to add.ejs with flash message
        res.render('student-edit', {
            id: req.params.id,
            name: full_name,
            age: age
        })
    }

    // if no error
    if( !errors ) {   
 
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
                
                req.flash('success', 'student successfully updated');
                res.redirect('/student');
            }
        })
    }
})


// delete book
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
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









//post data
router.post("/create",(req,res)=>{

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
    console.log('post request received');
    var sql = mysqlConnection.format("INSERT INTO students (full_name, age) VALUES (?, ?)", [fullname,age]);

    mysqlConnection.query(sql, function(err, result) {
              if (err) throw err;
              console.log('record inserted');
              res.redirect('/student');
            });
          });



//obtain data
// router.get('/',(req,res) => {
//     mysqlConnection.query("SELECT * from students", (err,rows,fields)=>{
//         if(err) throw err;
//         res.send(rows);
//     })
// })

module.exports = router;
