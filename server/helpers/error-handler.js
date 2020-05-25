'use strict';

const errorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(err.status).send({ message: err.message });
        return;
    }
    next();
}

module.exports = { errorHandler };
