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
const authRoutes = require("./auth");



router.get('/', (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    var type = req.query.type;
    var teacher = req.session.user[0].id;
    if (type !== null) {
        var sql = "SELECT * FROM worksheets where type_id = ?;SELECT * FROM students WHERE teacher_id = ?;";
        mysqlConnection = connectionRequest();
        mysqlConnection.query(sql, [type, teacher], (err, results, fields) => {
            if (err) {
                mysqlConnection.destroy();
                console.log(err);
                res.redirect('/worksheet');
            } else {
                console.log(results[1]);
                console.log(results[0]);
                mysqlConnection.destroy();
                res.render('worksheets', { result: results[0], student: results[1] });
            }
        });
    } else {
        var teacher = req.session.user[0].id;
        var sql = "SELECT * FROM students WHERE teacher_id = ?;"
        mysqlConnection = connectionRequest();
        mysqlConnection.query(sql, [teacher], (err, results) => {
            if (err) {
                console.error(err);
                mysqlConnection.destroy();
                res.redirect('/worksheet');
            } else {
                res.render('worksheets', { result: '', student: results });
            }

        })
    }

})

router.post('/', (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }

    let word_id = req.body.wordid;
    let result = req.body.response;

    var type = req.query.type;
    var sid = req.query.sid;
    var teacher = req.session.user[0].id;

    function json(word_id, result) {
        let answer = new Array();
        for (let i = 0; i < word_id.length; i++) {
            answer.push({
                type: word_id[i],
                response: result[i]
            });
        };
        return answer;
    };
    if (sid) {
        var final = json(word_id, result);
        console.log(final[0]);
        mysqlConnection = connectionRequest();
        var sql = 'INSERT INTO responses (teacher_id,student_id,type_id,word_id,correct,incorrect) VALUES';
        final.forEach(element => {
            if (element.response.length !== 0) {


                var response = element.response;
                var word_id = element.type;

                // if(response[i]===true)
                if (response === 'true') {
                    var correct = true;
                    var incorrect = null;

                    sql += '(' + teacher + ',' + sid + ',' + type + ',' + word_id + ',' + correct + ',' + incorrect + '),';

                } else {
                    var correct = null;
                    var incorrect = true;

                    sql += '(' + teacher + ',' + sid + ',' + type + ',' + word_id + ',' + correct + ',' + incorrect + '),';
                }

            }

        });
        console.log(sql);

        sql = sql.slice(0, -1);
        mysqlConnection.query(sql, (err, result) => {
            if (err) {
                mysqlConnection.destroy();
                console.error(err);
            } else {
                console.log(result);
                mysqlConnection.destroy();
                res.redirect('/worksheet');
            }
        })
    } else {
        mysqlConnection.destroy();
        res.redirect('/worksheet');
    }
});

// router.get('/(:typeid)',(req,res)=>{
//     if(!req.session.loggedin){
//         res.redirect('/login');
//         return;
//     }


//     var type = req.type;
//     var teacher = req.session.user[0].id;
//     if(type){
//         var sql = "SELECT * FROM worksheets where type_id = ?;SELECT * FROM students WHERE teacher_id = ?;";
//         mysqlConnection.query(sql,[type,teacher],(err,results,fields)=>{
//         if(err) throw err;
//         console.log(results[1]);
//         console.log(results[0]);
//         res.render('worksheets',{result: results[0], student: results[1]});
//     });
//     }
//     // var id = req.params.typeid;
//     var teacher = req.session.user[0].id;
//     console.log(teacher);

//     })






















module.exports = router;