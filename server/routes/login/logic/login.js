'use strict';
const { sign } = require('../../../middleware/jwt-authentication');

const authenticateUser = (db, email, password) => {
    return db.query(`Select * from users where email='${email}' and password='${password}'`)
        .then((res) => {
            if (res && res.length === 0) {
                return { isLoggedIn: false, message: 'Incorrect user email or password!' }
            }
            const token = sign({ email, password });
            return { isLoggedIn: true, token };
        });
}

module.exports = { authenticateUser };
