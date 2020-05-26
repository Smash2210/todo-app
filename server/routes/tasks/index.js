'use strict';

const routes = require('express').Router({ mergeParams: true })
const { listItems } = require('./get');
const { createTask } = require('./post');
const { updateStatus, updateTitle } = require('./put');
const { deleteTask } = require('./delete');

module.exports = (db) => {
    routes.get('/list', listItems(db));
    routes.post('/create', createTask(db));
    routes.put('/update-status', updateStatus(db));
    routes.put('/update-title', updateTitle(db));
    routes.delete('/remove', deleteTask(db));
    return routes
}
