var express = require('express');

var router = express.Router();

router.get('/:id', (req, res) => {
    val = [req.params.id]
    dbconnection.query('SELECT A.first_name, A.middle_name, A.last_name, A.email, A.phone, A.last_login_date, A.account_type FROM account as A WHERE A.account_id = ?', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        if (result.length > 0)
            sendResponse(res, 1, 'Done.', result[0]);
        else
            sendResponse(res, 0, 'Incorrect account_id.', null);

    });
});

router.get('/customer/:id', (req, res) => {
    val = [req.params.id]
    dbconnection.query('SELECT * FROM customer WHERE  account_id = ?', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        if (result.length > 0)
            sendResponse(res, 1, 'Done.', result[0]);
        else
            sendResponse(res, 0, 'Incorrect account_id.', null);

    });
});

router.get('/customer/:id/saved_adresses/', (req, res) => {
    val = [req.params.id]
    dbconnection.query('SELECT * FROM saved_addresses WHERE customer_id = ?', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        if (result.length > 0)
            sendResponse(res, 1, 'Done.', result);
        else
            sendResponse(res, 0, 'Incorrect account_id.', null);

    });
});

module.exports = router;
