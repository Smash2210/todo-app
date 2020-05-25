'use strict'

const routes = require('express').Router({ mergeParams: true })
const { healthCheck } = require('./get');
module.exports = () => {
    routes.get('/', healthCheck());
    return routes
}
