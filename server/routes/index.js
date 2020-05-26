'use strict';

const express = require('express');
const routes = express.Router({ mergeParams: true });

module.exports = (db) => {
  routes.use('/', require('./health-check')());
  routes.use('/login', require('./login')(db));
  routes.use('/create-user', require('./create-users')(db));
  routes.use('/tasks/', require('./tasks')(db));
  return routes;
}