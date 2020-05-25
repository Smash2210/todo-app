'use strict';
const { sign } = require('../../../middleware/jwt-authentication');

const addUser = (db, email, password, username) => {
    return db.query(`Select * from users where email='${email}'`)
        .then((res) => {
            if (res && res.length > 0) {
                return { isLoggedIn: false, message: 'User already exists!' }
            }
            return db.query(`INSERT INTO \`users\` (\`email\`, \`username\`, \`password\`) VALUES ('${email}', '${username}', '${password}');`)
                .then(() => {
                    const token = sign({ email, password });
                    return { isLoggedIn: true, token };
                })
        });
}

module.exports = { addUser };
