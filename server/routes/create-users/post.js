'use strict';
const { addUser } = require('./logic/create-user');
const md5 = require('md5');

const createUser = (db) => {
    return (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        if (!email || !password || !username) {
            res.status(400).send({ success: false, message: 'Please provide username, email, password to create an account!' });
            return;
        }
        return addUser(db, email, md5(password), username)
            .then((response) => {
                res.status(200).send({ success: true, data: response });
            }).catch(err => {
                console.log(err);
                res.status(500).send({ success: false, err });
            });
    }
}

module.exports = { createUser }