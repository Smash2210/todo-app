'use strict';

const routes = require('express').Router({ mergeParams: true })
const { updatePassword } = require('./put');
module.exports = (db) => {
    routes.put('/', updatePassword(db));
    return routes
}
