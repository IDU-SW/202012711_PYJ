const mysql = require('mysql2');

const dbConfig = {
   host: '127.0.0.1',
    user: 'dev',
    password: '1234',
    port: 3306,
    database: 'example',
   multipleStatements: true,
};

const pool = mysql.createPool(dbConfig).promise();
module.exports = pool;
