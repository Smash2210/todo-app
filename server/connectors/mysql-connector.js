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
                console.log('Error connecting to mysql server');
                reject(err.stack);
            }
            console.log('Connected to mysql server');
            resolve(connection);
        });
    })
}

module.exports = { mysqlConnector };