'use strict';
const md5 = require('md5');

const updatePassword = (db) => {
    return (req, res, next) => {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).send({ success: false, message: 'Current or new password empty!' });
        }
        return db
            .query(`Select * from users where \`password\` = '${md5(currentPassword)}' AND \`email\`='${req.email}'`)
            .then((result) => {
                if (result && result.length > 0) {
                    return db
                        .query(`Update users SET \`password\`='${md5(newPassword)}' where \`email\`='${req.email}'`)
                        .then((_result)=>{
                            return res.status(200).send({success: true, message: 'Password updated successfullly'});
                        })
                }
                return res.status(400).send({ success: false, message: 'Invalid password or email' })
            }).catch(err => {
                console.log(err);
                res.status(500).send({ success: false, message: 'some error occured' });
            });
    };
};

module.exports = { updatePassword };
