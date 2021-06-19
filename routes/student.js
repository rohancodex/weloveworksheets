const express = require ('express');
const router = express();
const mysqlConnection = require("../database");
const path = require('path');
const bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({extended: true}));

//post data
router.get('/',(req,res)=>{
    res.sendFile(path.resolve('views/student.html'));
});

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

// router.post('/create', function(req, res, next) {
//     var first_name = req.body.firstname;
//     var last_name = req.body.lastname;
//     var age = req.body.age;
//     var name = first_name.concat(last_name);
//     var sql = 'INSERT INTO students (full_name, age) VALUES ("${name}", "${age}")';
//     mysqlConnection.query(sql, function(err, result) {
//       if (err) throw err;
//       console.log('record inserted');
//       res.redirect('/student');
//     });
//   });

//obtain data
// router.get('/',(req,res) => {
//     mysqlConnection.query("SELECT * from students", (err,rows,fields)=>{
//         if(err) throw err;
//         res.send(rows);
//     })
// })

module.exports = router;
