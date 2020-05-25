'use strict';
const { authenticateUser } = require('./logic/login');
const md5 = require('md5');

const login = (db) => {
    return (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            res.status(400).send({ success: false, message: 'Please provide email and password to login' });
            return;
        }
        return authenticateUser(db, email, md5(password))
            .then((response) => {
                res.status(200).send({ success: true, data: response });
            }).catch(err => {
                console.log(err);
                res.status(500).send({ success: false, err });
            });
    }
}

module.exports = { login }