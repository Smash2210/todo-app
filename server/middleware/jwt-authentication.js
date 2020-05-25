'use strict';
const config = require('../config');
const { features } = config;
const { jwt, unprotectedRoutes, secret } = features;
const jsonwebtoken = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const verify = () => {
    if (jwt) {
        return expressJwt({ secret }).unless({
            path: unprotectedRoutes
        });
    }
}

const sign = (payload) => {
    const ttl = 1000 * 60 * 60 * 24;
    return jsonwebtoken.sign(payload, secret, { expiresIn: ttl.toString() });
}

module.exports = { sign, verify };
