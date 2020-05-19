var express = require('express');

var router = express.Router();

router.post('/create', (req, res) => {
    var val = [req.body.order_id, req.body.complaint_date, req.body.customer_service_id, req.body.response_date, req.body.complaint_status];
    var query = 'INSERT INTO complaint (order_id, complaint_date, customer_service_id, response_date, complaint_status) '
        + ' VALUES ( ?, ?, ?, ?, ?)';

    dbconnection.query(query, val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        sendResponse(res, 1, 'Done.', { complaint_id: result.insertId, order_id: req.body.order_id });
    });
});


router.get('/', async (req, res) => {
    var val = [req.query.complaint_id, req.query.order_id];
    var query = 'SELECT complaint_date, complaint_status, customer_service_id, response_date FROM complaint WHERE complaint_id= ? AND order_id= ?';

    let rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var result = rows[0][0];
    if (!result || result == "") {
        sendResponse(res, 0, "No complaint with the given order_id and complaint_id.", null);
        return;
    }

    query = 'SELECT *'
        + 'FROM flowergarden.order NATURAL JOIN flower_arrangement NATURAL JOIN district NATURAL JOIN province WHERE order_id = ?';

    val = [req.query.order_id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var order = rows[0][0];
    if (!order || order == "") {
        sendResponse(res, 0, "No order with the given order_id " + req.params.id, null);
        return;
    }

    val = [order.seller_id]
    rows = await dbconnection.promise().query('SELECT first_name, middle_name, last_name, phone, email, address_text, district_name FROM account NATURAL JOIN seller NATURAL JOIN district WHERE account_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });
    order.seller = rows[0][0];

    val = [order.courier_id];
    rows = await dbconnection.promise().query('SELECT first_name, middle_name, last_name, phone, email FROM account WHERE account_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });
    order.courier = rows[0][0];

    val = [order.customer_id];
    rows = await dbconnection.promise().query('SELECT first_name, middle_name, last_name, phone, email FROM account WHERE account_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });
    order.customer = rows[0][0];

    result.order=order;
    sendResponse(res, 1, "Done.", result);

});
module.exports = router;
