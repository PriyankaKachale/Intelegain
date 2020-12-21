const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'assignment'
});
module.exports =connection;

connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
});