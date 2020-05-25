'use strict';

const routes = require('express').Router({ mergeParams: true })
const { listItems } = require('./get');
module.exports = (db) => {
    routes.get('/', listItems(db));
    return routes
}
