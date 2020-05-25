'use strict';

const routes = require('express').Router({ mergeParams: true })
const { createUser } = require('./post');
module.exports = (db) => {
    routes.post('/', createUser(db));
    return routes
}
