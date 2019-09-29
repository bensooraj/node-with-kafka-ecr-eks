const mysql = require('mysql');

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
    dbConnection: mysqlConnectionPool,
    dbQuery
}
