'use strict';

const getTodoList = (db, email) => {
    return db.query(`SELECT * FROM todo_items WHERE email='${email}' and isDeleted=0;`)
        .then(res => {
            return res;
        });
}

module.exports = { getTodoList };
