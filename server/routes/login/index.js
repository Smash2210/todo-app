'use strict';

const routes = require('express').Router({ mergeParams: true })
const { login } = require('./post');
module.exports = (db) => {
    routes.post('/', login(db));
    return routes
}
