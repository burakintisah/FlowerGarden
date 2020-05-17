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

router.get('/customer/:id/saved_addresses/', (req, res) => {
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

router.post('/customer/:id/credit_card', (req, res) => {
    val = [req.body.credit_card, req.params.id];
    dbconnection.query('UPDATE customer SET credit_card=? WHERE account_id=? ', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        sendResponse(res, 1, 'Done.', null);
    });
});

router.post('/customer/:id/saved_addresses', (req, res) => {
    val = [req.body.address, req.body.district_id, req.body.customer_id];
    dbconnection.query('INSERT INTO saved_addresses (address, district_id, customer_id) VALUES (? , ?, ?)', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        sendResponse(res, 1, 'Done.', null);
    });
});

module.exports = router;
