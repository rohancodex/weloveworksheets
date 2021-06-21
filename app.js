const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const studentRoutes =  require("./routes/student");
const mysqlConnection = require('./database');
const ejsLint = require('ejs-lint');
const app = express();
const expressLayouts = require('express-ejs-layouts');
var flash = require('express-flash');
var session = require('express-session');


app.use('/student', studentRoutes);

// SET VIEW ENGINE
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views','views');

// USE BODY-PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({ 
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));

app.use(flash());




//create table
// app.get('/createstudentstable',(req,res)=>{
//     let sql = 'CREATE TABLE students(sid int AUTO_INCREMENT, full_name VARCHAR(255), age int, PRIMARY KEY(sid))';
//     db.query(sql,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send('posts table created');
//     })
// });

app.listen('3000',()=>{
    console.log("server started on port 3000");
});