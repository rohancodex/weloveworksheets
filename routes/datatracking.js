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

// import sess from studentRoutes;








// mysqlConnection.query("SELECT full_name,count(correct) as correct,COUNT(incorrect) as incorrect FROM datatracking WHERE teacher_id = ? GROUP BY full_name", function(err, rows) {
//     if (err) {
//         throw err;
//     } else {
//         setValue(rows);
//     }
// });

// function setValue(value) {

//     someVar = value;

// }


router.get('/', (req, res) => {
    // console.log(req.session);
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    var teacher = req.session.user[0].id;
    // var id = req.session;
    // console.log(sess);
    //view values


    var sql_correct = 'SELECT dayname(created_at) as day, count(correct) as correct, count(incorrect) as incorrect from datatracking  WHERE YEARWEEK(created_at)=YEARWEEK(NOW()) AND teacher_id = ? GROUP BY dayname(created_at);SELECT full_name,count(correct) as correct,COUNT(incorrect) as incorrect FROM datatracking WHERE teacher_id = ? GROUP BY full_name;';

    mysqlConnection.query(sql_correct, [teacher, teacher], (err, results) => {
        if (err) {
            console.log(err);
            res.redirect('/datatracking');
        }


        //line graph
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        var avg = [0, 0, 0, 0, 0, 0, 0];
        var row = new Array();
        row = results[0];
        for (var i in days) {
            for (var j in row) {
                if (row[j].day === days[i]) {
                    var percentage = (row[j].correct / (row[j].correct + row[j].incorrect)) * 100;
                    avg[i] = Math.floor(percentage);

                }
            }
        }

        let name = new Array();
        let progress = new Array();
        var someVar = new Array();
        someVar = results[1];
        for (var i in someVar) {
            name.push(someVar[i].full_name);
            progress.push(Math.floor((someVar[i].correct / (someVar[i].correct + someVar[i].incorrect)) * 100));
        }
        console.log(name);
        console.log(progress);

        function json(name, progress) {
            let student = new Array();
            for (let i = 0; i < name.length; i++) {
                student.push({
                    name: name[i],
                    progress: progress[i]
                });
            };
            return student;
        };
        let student = json(name, progress);
        console.log(student);
        console.log(avg);
        res.render('datatracking', { result: avg, student: student });

    })
});







// router.get('/student-data', (req, res) => {
//     var student_query = 'SELECT full_name,count(correct) as correct,COUNT(incorrect) as incorrect FROM datatracking GROUP BY full_name ORDER BY full_name;';
//     mysqlConnection.query(student_query, (err, result) => {
//         // console.log(result);

//         let name = new Array();
//         let progress = new Array();
//         for (var i in someVar) {
//             name.push(someVar[i].full_name);
//             progress.push(Math.floor((someVar[i].correct / (someVar[i].correct + someVar[i].incorrect)) * 100));
//         }
//         console.log(name);
//         console.log(progress);

//         function json(name, progress) {
//             let student = new Array();
//             for (let i = 0; i < name.length; i++) {
//                 student.push({
//                     name: name[i],
//                     progress: progress[i]
//                 });
//             };
//             return student;
//         };
//         let student = json(name, progress);
//         console.log(student);

//         res.render('student_data', { student: student });
//     });
// });

module.exports = router;