'use strict';

const createTask = (db) => {
    return (req, res, next) => {
        const { title } = req.body;
        const email = req.email;
        const status = 'active';
        return db
            .query(`INSERT INTO \`todo_items\` (\`title\`, \`status\`, \`email\`) VALUES ('${title}', '${status}', '${email}');`)
            .then((result) => {
                res.status(200).send({ success: true, data: [{ id: result.insertId }] });
            }).catch(err => {
                console.log(err);
                res.status(500).send({ success: false, message: JSON.stringify(err) });
            })
    }
};

module.exports = { createTask };
