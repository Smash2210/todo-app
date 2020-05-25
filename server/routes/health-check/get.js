'use strict';

const healthCheck = () => {
    return (req, res, next) => {
        res.status(200).send({ success: true, message: 'You have reached to api endpoint!' });
    }
}

module.exports = { healthCheck }