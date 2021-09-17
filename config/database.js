// const mysql = require('mysql2');



// var mysqlConnection = mysql.createConnection({
//     host     : process.env.DATABASE_HOST,
//     user     : process.env.DATABASE_USER,
//     password : process.env.DATABASE_PASSWORD,
//     port     : process.env.DATABASE_PORT,
//     database : process.env.DATABASE,
//     multipleStatements: true
// });

// // Create the connection pool. The pool-specific settings are the defaults
// const pool = mysql.createPool({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password : process.env.DATABASE_PASSWORD,
//   port     : process.env.DATABASE_PORT,
//   database: process.env.DATABASE,
//   waitForConnections: true,
//   connectionLimit: 1000,
//   queueLimit: 0,
//   multipleStatements: true
// });


// //connect
// mysqlConnection.connect(((err) => {
// if(err){
//      console.error(err);

// }
// else{
// console.log('mysql connected');
// }
// }));



module.exports = function() {

    let mysql = require('mysql2')
    const dotenv = require('dotenv');

    dotenv.config({ path: './.env' });

    //Establish Connection to the DB
    let connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE,
        multipleStatements: true
    });

    //Instantiate the connection
    connection.connect(function(err) {
        if (err) {
            console.log(`connectionRequest Failed ${err.stack}`)
        } else {
            console.log(`DB connectionRequest Successful ${connection.threadId}`)
        }
    });

    //return connection object
    return connection
}