const express = require('express');
const router = express();
const connectionRequest = require("../config/database");
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
    mysqlConnection = connectionRequest();
    mysqlConnection.query(sql_correct, [teacher, teacher], (err, results) => {
        if (err) {
            mysqlConnection.destroy();
            console.log(err);

        } else {

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
            mysqlConnection.destroy();
            res.render('datatracking', { result: avg, student: student });
        }




    })
});

router.get('/(:student)', (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    let name = req.params.student;
    let teacherId = req.session.user[0].id;
    let type = 'Alphabet';
    let today = new Date().toISOString().slice(0, 10);
    console.log(today);
    mysqlConnection = connectionRequest();
    let sql = "SELECT * FROM datatracking where full_name = ? AND teacher_id = ? AND type=? AND DATE(created_at) = ? GROUP BY(word); SELECT count(correct) as correct,COUNT(incorrect) as incorrect FROM datatracking where full_name = ? AND teacher_id = ? AND type= ? AND DATE(created_at) = ?;SELECT w.id, w.word, type FROM worksheets as w INNER JOIN worksheet_type as t ON w.type_id = t.id WHERE type = ?;";
    mysqlConnection.query(sql, [name, teacherId, type, today, name, teacherId, type, today, type], (err, results) => {
        if (err) {
            console.error(err);
            mysqlConnection.destroy();
        } else {
            mysqlConnection.destroy();
            console.log(results[1]);
            res.render('student-data', { word: results[0], chart: results[1], name: name, type: type, date: today, worksheet: results[2] });
        }
    })
})

router.post('/(:student)', (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }

    let type = req.body.type;
    let date = req.body.date;
    let name = req.body.name;
    let teacher = req.session.user[0].id;
    date = date.toString();
    mysqlConnection = connectionRequest();
    let sql = "SELECT * FROM datatracking where full_name = ? AND teacher_id = ? AND type=? AND DATE(created_at) = ? GROUP BY(word); SELECT count(correct) as correct,COUNT(incorrect) as incorrect FROM datatracking where full_name = ? AND teacher_id = ? AND type= ? AND DATE(created_at) = ?;SELECT w.id, w.word, type FROM worksheets as w INNER JOIN worksheet_type as t ON w.type_id = t.id WHERE type = ?;";
    mysqlConnection.query(sql, [name, teacher, type, date, name, teacher, type, date, type], (err, results) => {
        if (err) {
            console.error(err);
            mysqlConnection.destroy();
        } else {
            mysqlConnection.destroy();
            console.log(results[1]);
            res.render('student-data', { word: results[0], chart: results[1], name: name, type: type, date: date, worksheet: results[2] });
        }
    })
})

router.get('/(:student)/(:word)', (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    let name = req.params.student;
    let word = req.params.word;
    let teacher = req.session.user[0].id;
    let today = new Date().toISOString().slice(0, 10);
    mysqlConnection = connectionRequest();
    //"SELECT count(correct) as correct,COUNT(incorrect) as incorrect FROM datatracking where full_name = ? AND teacher_id = ? AND type= ?"

    let sql = "SELECT COUNT(correct) as correct, COUNT(incorrect) as incorrect FROM datatracking WHERE teacher_id = ? AND full_name = ? AND word = ? AND DATE(created_at) = ?; "
    mysqlConnection.query(sql, [teacher, name, word, today], (err, results) => {
        if (err) {
            console.error(err);
            mysqlConnection.destroy();
        } else {
            mysqlConnection.destroy();
            res.render('word-analysis', { count: results });
        }
    })
})


module.exports = router;