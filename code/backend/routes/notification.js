var express = require('express');

var router = express.Router();

router.get('/account/:id', (req, res) => {
    var val = [req.params.id];
    var query = 'SELECT notification_id, description, timestamp FROM notification WHERE account_id = ?';

    dbconnection.query(query, val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        sendResponse(res, 1, 'Done.', result[0]);
    });
});

router.post('/delete', async(req, res) => {
    var notifications = req.body.notifications;

    for (i = 0; i < notifications.length; i++) {
        var val = [notifications[i].notification_id];
        var query = 'DELETE FROM notification WHERE notification_id = ?';

        let rows = await dbconnection.promise().query(query, val).catch((err) => {
            console.log('Error at: ' + err);
            sendResponse(res, 0, err.sqlMessage, null);
        });
    }
    sendResponse(res, 1, "Done.", null);
});

module.exports = router;