'use strict';
const { getTodoList } = require('./logic/getTodoLists');

const listItems = (db) => {
    return (req, res, next) => {
        const email = req.query.email;
        if (!email) {
            res.status(400).send({ success: false, message: 'Please login and try again!' });
            return;
        }
        return getTodoList(db, email)
            .then((response) => {
                res.status(200).send({ success: true, data: response });
            }).catch(err => {
                console.log(err);
                res.status(500).send({ success: false, err });
            });
    }
}

module.exports = { listItems }