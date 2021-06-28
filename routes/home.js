// const express = require ('express');
// const router = express();
// const serveIndex = require('serve-index');
// const mysqlConnection = require("../database");

// router.use(
//     '/ftp',
//     express.static('public/ftp'),
//     serveIndex('public/ftp', { icons: true })
//   )

const express = require ('express');
var router = express.Router();
const mysqlConnection = require("../database");
const ejs = require('ejs');
router.use( express.static( "public" ) );

router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/register',(req,res)=>{
    res.render('register',{message:''}); 
})

router.get('/login',(req,res)=>{
    res.render('login',{message:''}); 
})

/* GET users listing. */
router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/login');
});


module.exports = router;