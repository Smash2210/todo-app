'use strict';

const updateStatus = (db) => {
    return (req, res, next) => {
        const { status, taskId } = req.body;
        const email = req.email;
        return db
            .query(`UPDATE \`todo_items\` SET \`status\`='${status}' WHERE \`id\`='${taskId}' AND \`email\`='${email}';`)
            .then(() => {
                res.status(200).send({ success: true, message: "Status updated successfully" });
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ success: false, message: JSON.stringify(err) });
            });
    }
};

const updateTitle = (db) => {
    return (req, res, next) => {
        const { title, taskId } = req.body;
        const email = req.email;
        return db
            .query(`UPDATE \`todo_items\` SET \`title\`='${title}' WHERE \`id\`='${taskId}' AND \`email\`='${email}';`)
            .then(() => {
                res.status(200).send({ success: true, message: "Title updated successfully" });
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ success: false, message: JSON.stringify(err) });
            });
    }
}

module.exports = { updateStatus, updateTitle };
