'use strict';

const deleteTask = (db) => {
    return (req, res, next) => {
        const { email, taskId } = req.body;
        return db
            .query(`UPDATE \`todo_items\` SET \`isDeleted\`='1' WHERE \`id\`='${taskId}' AND \`email\`='${email}';`)
            .then(() => {
                res.status(200).send({ success: true, message: "Deleted successfully" });
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ success: false, message: JSON.stringify(err) });
            });
    }
};

module.exports = { deleteTask };
