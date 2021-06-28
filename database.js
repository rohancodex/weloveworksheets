const mysql = require('mysql2');
const dotenv = require('dotenv'); 

dotenv.config({path: './.env'});

//create connection
var mysqlConnection = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    port     : process.env.DATABASE_PORT,
    database : process.env.DATABASE
});

//connect
mysqlConnection.connect(((err) => {
if(err){
    throw err;
}
console.log('mysql connected');
}));

module.exports = mysqlConnection;
