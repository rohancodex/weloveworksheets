
// const mysqlConnection = require("../database");
// var express = require('express');
// var router = express.Router();
// const bcrypt = require('bcryptjs');
// const session = require("express-session");
// const app = require('../app');
// exports.register = (req,res)=> {
//         console.log(req.body);
        
//         const {name,email,password,confirmPassword} = req.body;
//         console.log(name);
//         mysqlConnection.query('SELECT email FROM teachers WHERE email = ?',[email], async (err,results)=>{
//             if(err) throw err;
//             if(results.length>0){
//                 return res.render('register',{
//                     message: 'That email is already in use'
//                 });

//             }
//             else if(password !== confirmPassword){
//                 return res.render('register',{
//                     message: 'Passwords do not match'
//                 });
//             }
            
//             let hashedPassword = await bcrypt.hash(password, 8);
            

//             mysqlConnection.query('INSERT INTO teachers SET ?',{name:name,email:email,password:hashedPassword},(err,results)=>{
//                 if(err) throw err;
//                 else{
//                     res.redirect('/login');
//                 }
//             });
//         })
       
// }
// exports.login = (req,res)=> {
    
//     console.log(req.body);
//     const {email,password} = req.body;
//     mysqlConnection.query('SELECT * FROM teachers WHERE email=?',[email],async(err,results)=>{
//         if(!results || !(await bcrypt.compare(password,results[0].password))){
//             res.render('login',{
//                 message:'E-mail or password is incorrect'
//             })
//         }
//         else{                  
//                 req.session.loggedin = true;
//                 req.session.user = results;
//                 var sess = req.session;
//                 res.redirect('/student');
//         }
        
//     })
// }

// exports.authorize = (req,res)=>{
    
//     console.log(req.session);
// }