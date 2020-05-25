'use strict';
const mysql = require('mysql');
const { database } = require('../config');

const mysqlConnector = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: database.host,
            user: database.user,
            password: process.env.DB_PASSWORD,
            database: database.dbName
        });

        connection.connect(function (err) {
            if (err) {
                reject(err.stack);
            }
            resolve(connection);
        });
    })
}

module.exports = { mysqlConnector };