const mysql = require('mysql2');


//create connection
var mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port     : '3308',
    database : 'weloveworksheets'
});

//connect
mysqlConnection.connect(((err) => {
if(err){
    throw err;
}
console.log('mysql connected');
}));

module.exports = mysqlConnection;
