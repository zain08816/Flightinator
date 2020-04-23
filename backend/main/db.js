const mysql = require('mysql');
const password = require('./password.js');

const connection = mysql.createConnection({
    host: 'cs336-skkza.c7ce4qsxirkj.us-east-2.rds.amazonaws.com',
    user: 'test',
    password: password,
    database: 'flightinator',
    port: 3306
})

connection.connect(err => {
    if( err ) console.log(`uh oh couldn't connect to database: ${err}.`);
    else console.log("Backend successfully connected to Database!")
})

module.exports = connection