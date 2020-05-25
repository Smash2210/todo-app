'use strict';

const express = require('express');
const app = express();
const config = require('./config');
const routes = require('./routes');
const jwt = require('./middleware/jwt-authentication');
const { errorHandler } = require('./helpers/error-handler');
const { port } = config;
const { mysqlConnector } = require('./connectors/mysql-connector');
const { mysqlWrapper } = require('./helpers/query-wrapper');
const bodyParser = require('body-parser');

mysqlConnector()
    .then((_db) => {
        const db = mysqlWrapper(_db);
        app.use(bodyParser.json());
        app.use('/', jwt.verify(), routes(db));

        app.use(errorHandler);

        app.listen(port, () => console.log(`Application listening on port: ${port}`))
    }).catch((err) => {
        console.log(err);
    })
