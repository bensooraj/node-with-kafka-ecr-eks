const AWS = require('aws-sdk');
const mysql = require('mysql');

// S3 Service
let s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_USER_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_USER_SECRET_ACCESS_KEY
});

// MySQL Service
const mysqlConnectionPool = mysql.createPool({
    host: 'mysql-service',
    user: process.env.MYSQL_SERVICE_USERNAME,
    password: process.env.MYSQL_SERVICE_PASSWORD,
    database: 'nodemsdb'
});

mysqlConnectionPool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

mysqlConnectionPool.on('connection', function (connection) {
    console.log('Connection %d connected. State: %s ', connection.threadId, connection.state);
});

mysqlConnectionPool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

mysqlConnectionPool.on('error', function (error) {
    console.log('Connection Errored Out: ', error);
});

const dbQuery = async (query) => {
    return new Promise((resolve, reject) => {
        mysqlConnectionPool.query(query, function (error, results, fields) {
            if (error) {
                console.log("[Error] dbQuery: ", error);
                reject(error)
            };
            resolve(results);
        });
    });
};

module.exports = {
    s3,
    dbConnection: mysqlConnectionPool,
    dbQuery
}
