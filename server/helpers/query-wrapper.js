'use strict';

const mysqlWrapper = (db) => {
    return {
        query: (query) => {
            return new Promise((resolve, reject) => {
                db.query(query, (err, results, fields) => {
                    if (err) reject(err);
                    resolve(results);
                })
            });
        }
    }
}

module.exports = { mysqlWrapper };