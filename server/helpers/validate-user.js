'use strict';
const jsonwebtoken = require('jsonwebtoken');
const { features: { unprotectedRoutes } } = require('../config/index');

const validateUser = (db) => {
    return (req, res, next) => {
        if(unprotectedRoutes.includes(req.originalUrl)){
            next();
            return;
        }
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const { email } = jsonwebtoken.decode(token);
        if (!email) {
            res.status(400).send({ success: false, message: 'invalid token' });
        }
        return db
            .query(`Select * from users where \`email\`='${email}'`)
            .then((result) => {
                if (result && result.length > 0) {
                    req.email = email;
                    return next();
                }
                return res.status(400).send({ success: false, message: 'User does not exists!' });
            }).catch(err => {
                console.log(err);
                return res.status(500).send({ success: false, message: 'Error in fetching data from database' });
            })
    }
};

module.exports = { validateUser };